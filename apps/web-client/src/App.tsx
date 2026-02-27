import TRPCQueryProvider from "@/TRPCQueryProvider";
import Test from "@/Test";

export default function App() {

  return (
    <TRPCQueryProvider>
      <Test />
    </TRPCQueryProvider>
  );
}
