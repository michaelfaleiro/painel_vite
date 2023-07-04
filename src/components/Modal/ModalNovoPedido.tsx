import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

interface Props {
  isOpen: boolean;
  setIsOpen(value: boolean): void;
}

const schemaInput = z.object({
  numeroPedido: z.number({
    required_error: "Obrigatório",
    invalid_type_error: "Apenas Números",
  }),
  numeroNfe: z.number({
    invalid_type_error: "Apenas Números",
  }),
  dataPedido: z.date({
    invalid_type_error: "Data Inválida",
  }),
  nomeCliente: z.string().nonempty("Campo Obrigatório"),
  emailCliente: z.string().email("Email Inválido"),
});

type RInput = z.infer<typeof schemaInput>;

export default function ModalNovaRemessa({ isOpen, setIsOpen }: Props) {
  const {
    register,
    reset,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<RInput>({ resolver: zodResolver(schemaInput) });

  const handleSubmit = async (data: RInput | unknown) => {
    await api
      .post("remessa", data)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
    reset();
    setIsOpen(false);

    await queryClient.invalidateQueries(["listaremessas"]);
  };

  if (isOpen) {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm justify-center flex items-center
      
       "
      >
        <div className="bg-slate-700 p-2 mb-3 h-[600px] rounded-md text-gray-300 ">
          <div className=" flex mb-4 justify-between ">
            <h5 className="font-semibold ">Criar nova remessa</h5>

            <button
              onClick={function () {
                reset();
                setIsOpen(!open);
              }}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-red-700 hover:text-red-400"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <form action="" onSubmit={onSubmit(handleSubmit)} className=" ">
            <div className="flex gap-2 w-96 flex-wrap">
              <div className="flex flex-col w-[58%] h-20">
                <label htmlFor="numeroPedido" className="">
                  Número Pedido
                </label>
                <input
                  type="text"
                  id="numeroPedido"
                  className="text-black p-1 rounded-md focus:bg-gray-300"
                  {...register("numeroPedido", { valueAsNumber: true })}
                />

                {errors.numeroPedido && (
                  <span className="text-red-700 font-semibold">
                    {errors.numeroPedido.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col h-16 w-[58%] ">
                <label htmlFor="numeroNfe" className="">
                  Número Nfe
                </label>
                <input
                  type="text"
                  id="numeroNfe"
                  className="text-black p-1 rounded-md focus:bg-gray-300"
                  {...register("numeroNfe", { valueAsNumber: true })}
                />
                {errors.numeroNfe && (
                  <span className="text-red-700 font-semibold">
                    {errors.numeroNfe.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col w-[38%]">
                <label htmlFor="dataPedido" className="">
                  Data do Pedido
                </label>
                <input
                  type="date"
                  id="dataPedido"
                  className="text-black p-1 rounded-md focus:bg-gray-300"
                  {...register("dataPedido", { valueAsDate: true })}
                />
                {errors.dataPedido && (
                  <span className="text-red-700 font-semibold">
                    {errors.dataPedido.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col w-full h-20">
                <label htmlFor="nomeCliente" className="">
                  Nome Cliente
                </label>
                <input
                  type="text"
                  id="nomeCliente"
                  className="text-black p-1 rounded-md focus:bg-gray-300"
                  {...register("nomeCliente")}
                />
                {errors.nomeCliente && (
                  <span className="text-red-700 font-semibold">
                    {errors.nomeCliente.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col w-full h-20">
                <label htmlFor="emailCliente" className="">
                  E-mail Cliente
                </label>
                <input
                  type="email"
                  id="emailCliente"
                  className="text-black p-1 rounded-md focus:bg-gray-300"
                  {...register("emailCliente")}
                />
                {errors.emailCliente && (
                  <span className="text-red-700 font-semibold">
                    {errors.emailCliente.message}
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
    );
  } else {
    null;
  }
}
