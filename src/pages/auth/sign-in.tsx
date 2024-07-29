import { Helmet } from "react-helmet-async";
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { toast } from 'sonner'


import { Button } from "@/Components/button";
import { Label } from '@/Components/label'
import { Input } from '@/Components/input'
import { useMutation } from "@tanstack/react-query";
import { sigIn } from "@/api/sign-in";


const signInForm = z.object({
    email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
    const [searchParams] = useSearchParams()

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignInForm>({
        defaultValues: {
            email: searchParams.get('email') ?? ''
        }
    })

    const { mutateAsync: authenticate } = useMutation({
        mutationFn: sigIn,
    })

    async function handleSignIn(data: SignInForm) {
        try {
            await authenticate({ email: data.email })
            console.log(data);

            toast.success('Login efetuado com sucesso!')
        } catch {
            toast.error('Erro ao efetuar login!')
        }
    }

    return (
        <>
            <Helmet title="Login" />
            <div className="p-8">
                <Button variant="ghost" asChild className="absolute right-8 top-8">
                    <Link to="/sign-up" className="">
                        Novo estabelecimento
                    </Link>
                </Button>

                <div className="flex w-[350px] flex-col justify-center gap-6">

                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Acessar painel</h1>
                        <p className="text-sm text-muted-foreground">acompanhe suas vendas pelo painel do parceiro</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Seu e-mail</Label>
                            <Input type="email" id="email" placeholder="Digite seu e-mail" {...register('email')} />
                        </div>
                        <Button
                            className="w-full"
                            disabled={isSubmitting}
                            type="submit"
                        >
                            Acessar painel
                        </Button>
                    </form>
                </div>
            </div>


        </>
    );
}