export default function Navigation({
    title,
    icon,
    params,
    setparams
  }: {
    title: string;
    icon: string;
    params: string;
    setparams: React.Dispatch<React.SetStateAction<string>>;
  }) {
    return (
      <li onClick={()=>setparams(title.toLocaleLowerCase())} className={`w-full h-20 flex place-content-start place-items-center px-2 transition-all ${params===title.toLocaleLowerCase()? "border-r-4 border-r-white":""}`}>
       <p>{title}</p>
      </li>
    );
  }
  