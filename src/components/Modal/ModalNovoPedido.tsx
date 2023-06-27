import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

interface Props {
  isOpen: boolean;
  setIsOpen(value: boolean): void;
}

interface Input {
  numero_pedido: string;
  nota_fiscal: string;
  nome_cliente: string;
  data_pedido: string;
  email_cliente: string;
}

const schema = object({
  numero_pedido: string().required("Campo Obrigatório"),
  nota_fiscal: string().required("Campo Obrigatório"),
  nome_cliente: string().required("Campo Obrigatório"),
  data_pedido: string().required("Campo Obrigatório"),
  email_cliente: string().required("Campo Obrigatório").email(),
});

export default function ModalNovaRemessa({ isOpen, setIsOpen }: Props) {
  const {
    register,
    reset,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const url = "http://127.0.0.1:5000/api/novo_pedido";

  const handleSubmit = async (data: Input) => {
    await api
      .post(url, data)
      .then(() => {
        console.log("Deu certo");
      })
      .catch((err) => {
        console.log(err);
      });
    reset();
    setIsOpen(false);

    await queryClient.invalidateQueries(["listaremessas"]);
  };

  if (isOpen) {
    return (
      <div className="bg-slate-800 p-2 mb-3 rounded-md  text-gray-300">
        <div className="flex mb-4 justify-between my-auto ">
          <h5>Nova Remessa</h5>

          <button
            className="text-white"
            onClick={() => setIsOpen(false)}
            type="button"
          >
            Fechar
          </button>
        </div>
        <form action="" onSubmit={onSubmit(handleSubmit)} className=" ">
          <div className="flex flex-wrap gap-3 h-20 ">
            <div className="flex flex-col">
              <label htmlFor="numero_pedido" className="">
                Número Pedido
              </label>
              <input
                type="text"
                id="numero_pedido"
                className="text-black p-1 rounded-md focus:bg-gray-300"
                {...register("numero_pedido")}
              />
              <span className="text-red-700 font-semibold">
                {errors?.numero_pedido?.message}
              </span>
            </div>

            <div className="flex flex-col">
              <label htmlFor="nota_fiscal" className="">
                Número Nfe
              </label>
              <input
                type="text"
                id="nota_fiscal"
                className="text-black p-1 rounded-md focus:bg-gray-300"
                {...register("nota_fiscal")}
              />
              <span className="text-red-700 font-semibold">
                {errors?.nota_fiscal?.message}
              </span>
            </div>

            <div className="flex flex-col">
              <label htmlFor="data_pedido" className="">
                Data do Pedido
              </label>
              <input
                type="date"
                id="data_pedido"
                className="text-black p-1 rounded-md focus:bg-gray-300"
                {...register("data_pedido")}
              />
              <span className="text-red-700 font-semibold">
                {errors?.data_pedido?.message}
              </span>
            </div>

            <div className="flex flex-col w-96">
              <label htmlFor="nome_cliente" className="">
                Nome Cliente
              </label>
              <input
                type="text"
                id="nome_cliente"
                className="text-black p-1 rounded-md focus:bg-gray-300"
                {...register("nome_cliente")}
              />
              <span className="text-red-700 font-semibold">
                {errors?.nome_cliente?.message}
              </span>
            </div>

            <div className="flex flex-col w-96">
              <label htmlFor="email_cliente" className="">
                E-mail Cliente
              </label>
              <input
                type="email"
                id="email_cliente"
                className="text-black p-1 rounded-md focus:bg-gray-300"
                {...register("email_cliente")}
              />
              <span className="text-red-700 font-semibold">
                {errors?.email_cliente?.message}
              </span>
            </div>
          </div>
          <div className="flex p-3 gap-3">
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
              onClick={() => setIsOpen(!open)}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    null;
  }
}
