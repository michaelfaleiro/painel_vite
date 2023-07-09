import { useQuery } from "react-query";

import ModalNovaRemessa from "../../components/Modal/ModalNovoPedido";
import { api } from "../../services/api";
import { Link } from "react-router-dom";
import { RInputProduto } from "../../components/Modal/NovoProduto/Index";
import Button from "../../components/Form/Button";

import { useState } from "react";
import { dateFormatter } from "../../utils/formatter";

export type Remessas = {
  id: string;
  numeroPedido: string;
  numeroNfe: string;
  dataPedido: string;
  nomeCliente: string;
  emailCliente: string;
  produtos: Array<RInputProduto>;
};

export default function Remessa() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data, isLoading, error } = useQuery<Remessas[]>(
    "listaremessas",
    async () => {
      const response = await api.get("/remessas");
      return response.data;
    }
  );

  return (
    <main>
      <div className="container mx-auto">
        <section>
          <h3 className="text-center text-lg text-gray-100 p-4">Dados</h3>
          <div className="mb-3">
            <Button
              text="Novo Pedido"
              className="bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4"
              onClick={() => setIsOpen(true)}
            />
          </div>
          <ModalNovaRemessa isOpen={isOpen} setIsOpen={setIsOpen} />
        </section>
        {isLoading ? (
          <div className="text-center">
            <div role="status">
              <h3 className=" text-gray-50 font-bold mb-3">
                Carregando Dados Aguarde...
              </h3>
              <svg
                aria-hidden="true"
                className="inline my-auto w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" />
              </svg>
            </div>
          </div>
        ) : error ? (
          <div>error</div>
        ) : (
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Numero Pedido
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nota Fiscal
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Data
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nome
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((pedido) => {
                  return (
                    <tr
                      key={pedido.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {pedido.numeroPedido}
                      </th>
                      <td className="px-6 py-4">{pedido.numeroNfe}</td>
                      <td className="px-6 py-4">
                        {dateFormatter.format(new Date(pedido.dataPedido))}
                      </td>
                      <td className="px-6 py-4">{pedido.nomeCliente}</td>
                      <td className="px-6 py-4">{pedido.emailCliente}</td>
                      <td className="px-6 py-4">
                        <Link to={`/remessa/${pedido.id}`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 text-red-700 hover:text-red-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                            />
                          </svg>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
