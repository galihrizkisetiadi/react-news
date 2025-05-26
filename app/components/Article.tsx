import { ArrowUpOutlined } from "@ant-design/icons";
import { Button } from "antd";
import type { Article } from "app/types/news";

export default function Article({ article }: { article: Article }) {
	return (
		<div className="flex w-full flex-col gap-8 p-8">
			<div className="flex w-full flex-col gap-2">
				<img src={article.urlToImage} alt="article1" className="w-full rounded-md" />
				<div className="flex justify-between">
					<div className="flex flex-col font-bold text-gray-700">
						<span>{article.source?.name}</span>
						<span> {article.author}</span>
						<span>{new Date(article.publishedAt).toLocaleDateString()}</span>
					</div>
					<Button color="blue" variant="link" onClick={() => window.open(article.url, "_blank")}>
						Open Article
						<ArrowUpOutlined className="rotate-45" />
					</Button>
				</div>
			</div>

			<div className="flex flex-col gap-4">
				<h1 className="text-xl font-bold">{article.title}</h1>
				<p className="text-gray-600">{article.content}</p>
			</div>
		</div>
	);
}
