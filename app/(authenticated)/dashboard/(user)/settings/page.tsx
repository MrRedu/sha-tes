'use client';
import { useAuth } from '@/components/auth/AuthProvider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Camera, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const { user: userData } = useAuth();
  const user = userData?.user_metadata;

  return (
    <div className="w-full">
      <div className="flex-none">
        {/* <h3 className="text-lg font-medium">Profile</h3> */}
        <h3 className="text-lg font-medium">Perfil</h3>
        <p className="text-muted-foreground text-sm">
          {/* This is how others will see you on the site. */}
          Este es como otros te verán en el sitio.
        </p>
      </div>
      <Separator className="my-4" />

      <div className="space-y-8 max-w-2xl">
        {/* Profile Picture Section */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <Avatar className="size-32 border border-border shadow-sm">
              <AvatarImage src={user?.avatar_url} alt={user?.full_name} />
              <AvatarFallback className="text-3xl">
                {user?.full_name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="outline"
              className="absolute -bottom-1 -right-1 size-10 rounded-full bg-background shadow-md hover:bg-accent ring-4 ring-background"
            >
              <Camera className="size-5 text-muted-foreground" />
            </Button>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium">Foto de perfil</p>
            <div className="flex items-center gap-4">
              <Button variant="secondary" size="sm" className="px-6">
                Subir nueva
              </Button>
              <Button variant="link" size="sm" className="text-destructive hover:text-destructive">
                Eliminar
              </Button>
            </div>
            <p className="text-xs text-muted-foreground/70 font-medium">JPG, GIF o PNG. Máx 2MB.</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <Field>
            <FieldLabel className="text-sm font-semibold">Nombre Completo</FieldLabel>
            <FieldContent>
              <Input
                defaultValue={user?.full_name || 'Eduardo'}
                className="h-11 text-base placeholder:text-muted-foreground/50 border-border/60"
              />
              <FieldDescription className="text-muted-foreground/60 text-xs">
                Este es tu nombre público. Puede ser tu nombre real o un pseudónimo.
              </FieldDescription>
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel className="text-sm font-semibold">Email</FieldLabel>
            <FieldContent>
              <div className="relative group/input">
                <Input
                  defaultValue={userData?.email || 'ejrb1234@gmail.com'}
                  className="h-11 text-base bg-muted/20 border-border/60 pr-12 text-muted-foreground/70"
                  readOnly
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <CheckCircle2 className="size-5 text-emerald-500 fill-emerald-50/50" />
                </div>
              </div>
              <FieldDescription className="text-muted-foreground/60 text-xs leading-relaxed">
                El correo electrónico está verificado y vinculado a tu cuenta de Google.
              </FieldDescription>
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel className="text-sm font-semibold">Biografía</FieldLabel>
            <FieldContent>
              <Textarea
                placeholder="Cuéntanos un poco sobre ti..."
                className="min-h-[140px] text-base resize-none border-border/60 placeholder:text-muted-foreground/40 leading-relaxed"
              />
            </FieldContent>
          </Field>
        </div>

        {/* Public Profile Box */}
        <div className="bg-muted/30 rounded-2xl p-5 border border-border/40 transition-all hover:bg-muted/40">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-bold tracking-tight">Perfil Público</p>
              <p className="text-xs text-muted-foreground/70 font-medium">
                Hacer que tu información sea visible para otros usuarios.
              </p>
            </div>
            <Switch
              defaultChecked
              className="data-[state=checked]:bg-destructive data-[state=unchecked]:bg-muted-foreground/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
