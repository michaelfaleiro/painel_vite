import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

interface Props {
  setIsModal(value: boolean): void;
  produtoid: string;
}

export default function ModalDelete({ setIsModal, produtoid }: Props) {
  const deleteProduto = async (id: string) => {
    await api.delete(`produto/${id}`);
    await queryClient.invalidateQueries(["remessas"]);
    setIsModal(false);
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
          <button
            onClick={() => deleteProduto(produtoid)}
            className="w-32 p-1 bg-green-900 hover:bg-green-700 rounded-full"
          >
            Sim
          </button>
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
