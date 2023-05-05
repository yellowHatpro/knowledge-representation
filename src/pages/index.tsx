import {useState} from "react";
import Dialog from "@/components/dialog";
import Form from "@/components/form";
import Table from "@/components/table";
import {useTable} from "@/context/table_context";

export default function Home() {

  //States
   const {table, insertToTable} = useTable() // table context
   const [isDialogOpen, setOpen] = useState(false); // for dialog visibility
   const [dialogSwitch, setDialogSwitch]  = useState(false) // for switch to change between adding relations or adding entities

  //State handlers
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  const handleDialogSwitch = () => {
       setDialogSwitch(!dialogSwitch)
  }


  return (
      <main
          className={`flex min-h-screen flex-col items-center justify-center bg-indigo-400`}>
        <div className={'flex text-white text-2xl object-center'}> A Classroom representation using Knowledge
          Representation
        </div>
        <button className={'flex bg-blue-800 text-white font-bold py-4 px-10 m-10 rounded opacity-50 text-xl'} onClick={
          handleOpen
        }> Let&apos;s get started
        </button>
        <Dialog open={isDialogOpen} onClose={handleClose} title={"Create ontologies"} isSwitch={dialogSwitch} setSwitch={handleDialogSwitch} >
          <Form open = {isDialogOpen}  switch={dialogSwitch}/>
        </Dialog>
        <Table data={table}></Table>
      </main>
  )
}
