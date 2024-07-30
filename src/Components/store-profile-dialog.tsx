import { Button } from "./button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "./dialog";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./text-area";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getManagedRestaurant, GetManagedRestaurantResponse } from "@/api/get-managed-restaurant";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { updateProfile } from "@/api/update-profile";
import { toast } from "sonner";


const storeProfileSchema = z.object({
    name: z.string().min(1),
    description: z.string().nullable()
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {

    const queryClient = useQueryClient()

    const {

        data: managedRestaurant,

    } = useQuery({

        queryKey: ['managed-restaurant'],
        queryFn: getManagedRestaurant,
        staleTime: Infinity,

    })

    const {

        register,
        handleSubmit,
        formState: { isSubmitting }

    } = useForm<StoreProfileSchema>({

        resolver: zodResolver(storeProfileSchema),
        values: {
            name: managedRestaurant?.name ?? '',
            description: managedRestaurant?.description ?? '',
        }

    })

    function updateManagedRestaurantCache({ name, description }: StoreProfileSchema) {
        const cached = queryClient.getQueryData<GetManagedRestaurantResponse>(['managed-restaurant'])

        if (cached) {
            queryClient.setQueryData<GetManagedRestaurantResponse>(['managed-restaurant'], {
                ...cached,
                name,
                description,
            })
        }

        return { cached }

    }


    const { mutateAsync: updateProfileFn } = useMutation({
        mutationFn: updateProfile,
        onSuccess: (_, { name, description }) => {
            if (typeof name === 'string') {
                const cached = queryClient.getQueryData<GetManagedRestaurantResponse>(['managed-restaurant'])

                if (cached) {
                    queryClient.setQueryData<GetManagedRestaurantResponse>(['managed-restaurant'], {
                        ...cached,
                        name,
                        description,
                    })
                }

            }
        },

        onMutate({ name, description }) {
            const { cached } = updateManagedRestaurantCache({ name, description })
            return { previousProfile: cached }
        },
        onError(_, __, context) {
            if (context?.previousProfile) {
                updateManagedRestaurantCache(context.previousProfile)
            }
        }
    })


    async function handleUpdateProfile(data: StoreProfileSchema) {
        try {
            await updateProfileFn({
                name: data.name,
                description: data.description,
            })

            toast.success('Perfil atualizado com sucesso')
        } catch {
            toast.error('Erro ao atualizar perfil')
        }
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Perfil da loja</DialogTitle>
                <DialogDescription>
                    Atualize as informações do seu estabelecimento visíveis ao seu cliente
                </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(handleUpdateProfile)}>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="name">Nome</Label>
                        <Input className="col-span-3" id="name" {...register('name')} />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="description">Descrição do negócio</Label>
                        <Textarea className="col-span-3" id="description" {...register('description')} />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button disabled={isSubmitting} type="button" variant="ghost">Cancelar</Button>
                    </DialogClose>
                    <Button disabled={isSubmitting} type="submit" variant='success'>Salvar</Button>

                </DialogFooter>
            </form>
        </DialogContent>
    )
}