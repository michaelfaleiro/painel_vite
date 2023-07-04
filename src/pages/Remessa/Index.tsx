import { api } from "../../services/api";
import { useParams } from "react-router-dom";
import ModalNovoPedido from "../../components/Modal/NovoProduto/Index";
import { useState } from "react";

import ModalDelete from "../../components/Modal/ModalDelete";
import { useQuery } from "react-query";
import Button from "../../components/Form/Button";

export default function RemessaDetails() {
  let { id } = useParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);

  const { data, isLoading, error } = useQuery(
    "remessas",
    async () => {
      const response = await api.get(`/remessa/${id}`);

      console.log(response.data);
      return response.data;
    },
    { refetchOnWindowFocus: false }
  );

  return (
    <div className="p-1 bg-secondary rounded-r-lg text-gray-100 h-[800px] ">
      <div className="text-center text-lg">
        <h4>Detalhes Remessa</h4>
      </div>

      {isLoading ? (
        <div className="text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline my-auto w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" />
            </svg>
            <span className="sr-only text-gray-50">Carregando Dados</span>
          </div>
        </div>
      ) : error ? (
        <div> Ops Algo deu Errado </div>
      ) : (
        <div className="flex gap-2 ">
          <section className=" border p-2 flex flex-col w-96">
            <header className="text-center h-12">
              <h5>Remessa</h5>
            </header>
            <main>
              <table>
                <tbody>
                  <>
                    <tr>
                      <th scope="row">Pedido</th>
                      <td>{data?.numeroPedido}</td>
                    </tr>
                    <tr>
                      <th scope="row">Nfe</th>
                      <td>{data?.numeroNfe}</td>
                    </tr>
                    <tr>
                      <th scope="row">Data Pedido</th>
                      <td>{data?.dataPedido}</td>
                    </tr>
                    <tr>
                      <th scope="row">Nome</th>
                      <td>{data?.nomeCliente}</td>
                    </tr>
                    <tr>
                      <th scope="row">Email</th>
                      <td>{data?.emailCliente}</td>
                    </tr>
                  </>
                </tbody>
              </table>
            </main>
            <div className="m-3">
              <Button
                text="Adicionar Produto"
                className="bg-red-700 hover:bg-red-500"
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>
          </section>
          {isOpen && <ModalNovoPedido isOpen={isOpen} setIsOpen={setIsOpen} />}

          <section className="border w-2/5 h-80 overflow-auto scrollbar  scrollbar-track-slate-800  scrollbar-thumb-slate-950">
            <h4 className="text-center font-medium">Produtos</h4>

            <table>
              <thead>
                <tr>
                  <th scope="col" className="px-2 py-3">
                    Quant
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Sku
                  </th>
                  <th scope="col" className="px-6 py-3 w-96 ">
                    Produto
                  </th>
                  <th className="text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {data?.produtos?.map((item: any) => {
                  return (
                    <tr key={item.id} className="">
                      <td className="px-6 py-4">{item.quantidade}</td>
                      <td className="">{item.sku}</td>
                      <td className="pl-2 text-left">{item.nomeProduto}</td>
                      <td className="px-6 py-4">
                        <button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 font-medium text-amber-400 hover:text-amber-600"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                            />
                          </svg>
                        </button>

                        <button onClick={() => setIsModal(true)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 font-medium text-red-700 hover:text-red-500"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                        {isModal && (
                          <ModalDelete
                            setIsModal={setIsModal}
                            produtoid={item.id}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          <section className="w-96 border">Estoque</section>
          <section className="grow border">Transportadora</section>
        </div>
      )}
    </div>
  );
}
