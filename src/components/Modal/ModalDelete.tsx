import { useState } from "react";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

interface Props {
  setIsModal(value: boolean): void;
  produtoid: string;
}

export default function ModalDelete({ setIsModal, produtoid }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteProduto = async (id: string) => {
    setIsLoading(true);
    await api.delete(`produto/${id}`);
    await queryClient.invalidateQueries(["remessas"]);
    setIsModal(false);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop justify-center flex items-center">
      <div className="w-96 bg-secondary  h-56 rounded-md ">
        <div className=" p-2 ">
          <div className="flex justify-end">
            <button onClick={() => setIsModal(false)} title="Fechar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 font-medium text-red-700 hover:text-red-600"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <h5 className="h-16 text-center font-bold">Você deseja Apagar ?</h5>
        <div className="flex gap-3 justify-center">
          {isLoading ? (
            <>
              <button
                disabled
                type="button"
                className="w-32 p-1 text-white bg-slate-800 focus:outline-none focus:ring-4
                    text-sm text-center rounded-full"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
                Apagando...
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => deleteProduto(produtoid)}
                className="w-32 p-1 bg-green-900 hover:bg-green-700 rounded-full"
              >
                Sim
              </button>
            </>
          )}

          <button
            onClick={() => setIsModal(false)}
            className="w-32 bg-red-900 hover:bg-red-700 p-1 rounded-full "
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
