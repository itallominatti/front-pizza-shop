import { Helmet } from "react-helmet-async";
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'


import { Button } from "@/Components/button";
import { Label } from '@/Components/label'
import { Input } from '@/Components/input'



const signUpForm = z.object({
    restaurantName: z.string(),
    managerName: z.string(),
    phone: z.string(),
    email: z.string().email(),
})

type signUpForm = z.infer<typeof signUpForm>

export function SignUp() {
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<signUpForm>()

    async function handlesignUp(data: signUpForm) {
       try {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        console.log(data);

        toast.success('Cadastro efetuado com sucesso!', {
            action: {
                label: 'Login',
                onClick: () => navigate('/sign-in')
            }
        })
       } catch {
        toast.error('Erro ao efetuar cadastro!')
       }
    }

    return (
        <>
            <Helmet title="Cadastro" />
            <div className="p-8">
                <Button variant="ghost" asChild className="absolute right-8 top-8">
                    <Link to="/sign-in" className="">
                        Fazer login
                    </Link>
                </Button>
                <div className="flex w-[350px] flex-col justify-center gap-6">

                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Criar conta grátis</h1>
                        <p className="text-sm text-muted-foreground">Seja um parceiro e comece suas vendas!</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit(handlesignUp)}>
                        <div className="space-y-2">
                            <Label htmlFor="restaurant">Nome do estabelecimento</Label>
                            <Input type="text" id="restaurant" placeholder="Digite seu e-mail" {...register('restaurantName')} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="managerName">Seu nome</Label>
                            <Input type="text" id="managerName" placeholder="Digite seu e-mail" {...register('managerName')} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Seu e-mail</Label>
                            <Input type="email" id="email" placeholder="Digite seu e-mail" {...register('email')} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Seu celular</Label>
                            <Input type="tel" id="phone" placeholder="Digite seu e-mail" {...register('phone')} />
                        </div>

                        <Button
                            className="w-full"
                            disabled={isSubmitting}
                            type="submit"
                        >
                            Finalizar cadastro
                        </Button>

                        <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                            Ao continuar, você concorda com nossos <a className="underline underline-offset-4" href="#"> termos de serviço </a>
                            e {' '}
                            <a className="underline underline-offset-4" href="#"> politicas de privacidade</a>.
                        </p>
                    </form>
                </div>
            </div>


        </>
    );
}