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
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm justify-center flex items-center">
      ModalDelete
      <button onClick={() => setIsModal(false)}>Fechar</button>
      <button
        onClick={() => deleteProduto(produtoid)}
        className="w-32  bg-green-900"
      >
        Sim
      </button>
    </div>
  );
}
