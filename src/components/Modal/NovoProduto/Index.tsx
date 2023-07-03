import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "../../../services/api";

import { useParams } from "react-router-dom";
import { queryClient } from "../../../services/queryClient";

const schemaInput = z.object({
  sku: z.string().nonempty("Campo vazio"),
  quantidade: z.number().int().default(1),
  nomeProduto: z.string().nonempty("Campo vazio"),
});

export type RInputProduto = z.infer<typeof schemaInput>;

interface Props {
  isOpen: boolean;
  setIsOpen(value: boolean): void;
}

export default function ModalNovoPedido({ isOpen, setIsOpen }: Props) {
  let { id } = useParams();
  const {
    register,
    reset,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<RInputProduto>({ resolver: zodResolver(schemaInput) });

  const handleSubmit = async (data: RInputProduto | unknown) => {
    await api
      .post(`produto/${id}`, data)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
    reset();
    setIsOpen(false);

    await queryClient.invalidateQueries(["remessas"]);
  };

  return (
    <div className="w-full h-full fixed inset-0 justify-center flex items-center backdrop-blur-none">
      <div className="min-w-4/12 h-96 border p-2 bg-zinc-700">
        <header className="flex justify-between">
          <span></span>
          <h4 className="text-center">Adicionar Produto</h4>
          <button className="" onClick={() => setIsOpen(!isOpen)}>
            Fechar
          </button>
        </header>
        <div className="mt-3">
          <form onSubmit={onSubmit(handleSubmit)}>
            <div className="flex flex-wrap gap-3 justify-center">
              <div className="flex flex-col w-14">
                <label htmlFor="quantidade" className="">
                  Quant
                </label>
                <input
                  type="text"
                  id="quantidade"
                  className="text-black p-1 rounded-md focus:bg-gray-300"
                  value="1"
                  {...register("quantidade", { valueAsNumber: true })}
                />
                <span className="text-red-700 font-semibold">
                  {errors.quantidade && <>{errors.quantidade.message}</>}
                </span>
              </div>

              <div className="flex flex-col w-96">
                <label htmlFor="sku" className="">
                  SKU
                </label>
                <input
                  type="text"
                  id="sku"
                  className="text-black p-1 rounded-md focus:bg-gray-300"
                  {...register("sku")}
                />

                {errors.sku && (
                  <span className="text-red-700 font-semibold">
                    {errors.sku.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col w-9/12">
                <label htmlFor="nomeProduto" className="">
                  Produto
                </label>
                <input
                  type="text"
                  id="nomeProduto"
                  className="text-black p-1 rounded-md focus:bg-gray-300"
                  {...register("nomeProduto")}
                />

                {errors.nomeProduto && (
                  <span className="text-red-700 font-semibold">
                    {errors.nomeProduto.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex p-3 gap-3 items-center justify-center">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4
                text-sm px-5 py-1.5 text-center mr-2 mb-2 rounded-full
            "
              >
                Adicionar
              </button>
              <button
                className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4
                text-sm px-5 py-1.5 text-center mr-2 mb-2 rounded-full"
                type="button"
                onClick={function () {
                  reset();
                  setIsOpen(!open);
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
