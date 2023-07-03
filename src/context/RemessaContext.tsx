import { ReactNode, createContext } from "react";
import { useQuery } from "react-query";
import { api } from "../services/api";

type Remessas = {
  id: string;
  numeroPedido: string;
  numeroNfe: string;
  dataPedido: string;
  nomeCliente: string;
  emailCliente: string;
};

interface RemessaContextType {
  remessas: Remessas[];
}

interface RemessaProviderProps {
  children: ReactNode;
}

const RemessaContext = createContext({} as RemessaContextType);

export function RemessaProvider({ children }: RemessaProviderProps) {
  const { data } = useQuery<Remessas[]>("listaremessas", async () => {
    const response = await api.get("/remessas");

    console.log(response.data);

    return response.data;
  });

  <RemessaContext.Provider value={{ remessas: [] }}>
    {children}
  </RemessaContext.Provider>;
}
