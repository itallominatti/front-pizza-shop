import { Button } from "@/Components/button";
import { Helmet } from "react-helmet-async";
import { Label } from '@/Components/label'
import { Input } from '@/Components/input'


export function SignIn() {
    return (
        <>
            <Helmet title="Login" />
            <div className="p-8">
                <div className="flex w-[350px] flex-col justify-center gap-6">

                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Acessar painel</h1>
                        <p className="text-sm text-muted-foreground">acompanhe suas vendas pelo painel do parceiro</p>
                    </div>

                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Seu e-mail</Label>
                            <Input type="email" id="email" placeholder="Digite seu e-mail" />
                        </div>
                        <Button type="submit">Acessar painel</Button>
                    </form>
                </div>
            </div>


        </>
    );
}