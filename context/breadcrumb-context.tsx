'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface BreadcrumbContextType {
  labels: Record<string, string>;
  setLabel: (id: string, label: string) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(
  undefined,
);

export function BreadcrumbProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [labels, setLabels] = useState<Record<string, string>>({});

  const setLabel = useCallback((id: string, label: string) => {
    setLabels((prev) => {
      // Evitar actualizaciones infinitas si el valor es el mismo
      if (prev[id] === label) return prev;
      return { ...prev, [id]: label };
    });
  }, []);

  return (
    <BreadcrumbContext.Provider value={{ labels, setLabel }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error(
      'useBreadcrumb debe usarse dentro de un BreadcrumbProvider',
    );
  }
  return context;
}

/**
 * Componente puente para que Server Components puedan "registrar" nombres
 */
export function BreadcrumbRegistry({
  id,
  label,
}: {
  id: string;
  label: string;
}) {
  const { setLabel } = useBreadcrumb();

  React.useEffect(() => {
    if (id && label) {
      setLabel(id, label);
    }
  }, [id, label, setLabel]);

  return null;
}
