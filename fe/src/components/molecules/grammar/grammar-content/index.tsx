import { IGrammar } from "@src/types/interface";
import "./style.scss";
import Link from "next/link";

function GrammarContent({ grammarItem }: { grammarItem: IGrammar }) {
  return grammarItem ? (
    <div className="grammar-content">
      <h1 className="gc-title">{grammarItem.title}</h1>
      <h2 className="gc-decs">{grammarItem.description}</h2>
      <div dangerouslySetInnerHTML={{ __html: grammarItem.content }}></div>
      {grammarItem.source && (
        <p className="gc-source">
          Link nguồn:
          <Link href={grammarItem.source}>{grammarItem.title}</Link>
        </p>
      )}
    </div>
  ) : null;
}

export default GrammarContent;
