import { Helmet } from "react-helmet";

type HeadProps = {
  title?: string;
};

export const Head = (props: HeadProps) => {
  const title = props.title ? `${props.title} - Ngaduit` : "Ngaduit";
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta
          name="description"
          content="Bantu track pengeluaran dan pemasukkan duit kamu"
        />
      </Helmet>
    </>
  );
};
