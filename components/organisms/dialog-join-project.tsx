'use client';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useJoinProject } from '@/hooks/use-projects';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '../ui/input-otp';
import { useDisclosure } from '@/hooks/use-disclosure';

export const DialogJoinProject = () => {
  const [isOpen, { close, toggle }] = useDisclosure();
  const { form, onSubmit, isLoading } = useJoinProject({
    close,
  });

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              Unirse a un proyecto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Unirse a un proyecto</DialogTitle>
              <DialogDescription>
                {`¡Únete a un proyecto con tus colegas!`}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="joinCode"
                render={({ field }) => (
                  <FormItem className="[&>:nth-child(3)]:justify-center mt-5">
                    <FormLabel className="text-center block">
                      Código único del proyecto
                    </FormLabel>
                    <FormControl>
                      <InputOTP
                        {...field}
                        maxLength={8}
                        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                      >
                        <InputOTPGroup className="[">
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                          <InputOTPSlot index={6} />
                          <InputOTPSlot index={7} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription className="text-center">
                      ¡El código es sensible a mayúsculas y minúsculas!
                    </FormDescription>
                    <FormMessage className="text-center" />
                  </FormItem>
                )}
              />

              {/* {error && (
                <Alert variant="destructive">
                  <AlertCircle />
                  <AlertTitle>{error}</AlertTitle>
                  <AlertDescription>{`Asegúrate de que el código sea correcto.`}</AlertDescription>
                </Alert>
              )} */}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit" onClick={onSubmit} disabled={isLoading}>
                {isLoading ? 'Enviando...' : 'Unirse a un proyecto'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
};
