import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Button, Card, Form, Input, Modal, Select, Space, Spin } from "antd";

import type { News, Article as TypeArticle } from "../types/news";
import Article from "../components/Article";

export function meta() {
	return [{ title: "News React" }];
}

export default function Home() {
	const [search, setSearch] = useState("");
	const [category, setCategory] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedArticle, setSelectedArticle] = useState<TypeArticle>();

	const { data, refetch, isLoading } = useQuery({
		queryKey: ["news", category],
		queryFn: () => getNews(search, category),
	});

	if (isLoading) {
		return (
			<div className="flex h-screen w-screen items-center justify-center">
				<Spin size="large" />
			</div>
		);
	}

	return (
		<div className="flex w-full flex-col gap-10">
			<Form className="flex w-full justify-end gap-2" onFinish={refetch}>
				<Select
					placeholder="Select Category"
					options={optionCategories}
					className="min-w-30"
					value={category}
					onChange={(value) => {
						setCategory(value);
					}}
				/>

				<Space.Compact>
					<Input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Space.Compact>
			</Form>

			{data?.totalResults === 0 ? (
				<div className="flex w-screen items-center justify-center">Not Found!</div>
			) : (
				<>
					<div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
						<img src={data?.articles?.[0]?.urlToImage} alt="article1" className="w-3/5 rounded-md" />
						<div className="flex w-full flex-col justify-center gap-4">
							<h1 className="text-xl font-bold">{data?.articles?.[0]?.title}</h1>
							<p className="text-gray-600">{data?.articles?.[0]?.description}</p>

							<Button
								color="blue"
								variant="link"
								className="w-fit"
								onClick={() => {
									setSelectedArticle(data?.articles?.[0]);
									setIsModalOpen(true);
								}}
							>
								{"Read More >"}
							</Button>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
						{data?.articles?.map((article, index) => {
							if (index > 0)
								return (
									<Card
										key={index}
										hoverable
										variant="borderless"
										cover={<img alt={`article${index}`} src={article?.urlToImage} className="h-80 w-full" />}
										onClick={() => {
											setSelectedArticle(article);
											setIsModalOpen(true);
										}}
									>
										<div className="flex min-h-[14rem] flex-col gap-4">
											<h1 className="text-lg font-bold">{article?.title}</h1>
											<p className="text-gray-600">{article?.description}</p>
											<Button
												color="blue"
												variant="link"
												className="mt-auto w-fit font-semibold"
												onClick={() => {
													setSelectedArticle(article);
													setIsModalOpen(true);
												}}
											>
												{"Read More >"}
											</Button>
										</div>
									</Card>
								);
						})}
					</div>

					<Modal
						open={isModalOpen}
						footer={null}
						centered
						onOk={() => setIsModalOpen(false)}
						onCancel={() => setIsModalOpen(false)}
						width={{
							xs: "90%",
							sm: "80%",
							md: "70%",
							lg: "70%",
							xl: "70%",
							xxl: "70%",
						}}
					>
						<Article article={selectedArticle as TypeArticle} />
					</Modal>
				</>
			)}
		</div>
	);
}

const getNews = async (search: string, category: string): Promise<News> => {
	const query = `https://newsapi.org/v2/top-headlines?apiKey=${import.meta.env.VITE_NEWS_API_KEY}&language=en&q=${search}&category=${category}`;

	const response = await fetch(query);

	return response.json();
};

const optionCategories = [
	{
		label: "All",
		value: "",
	},
	{
		label: "Business",
		value: "business",
	},
	{
		label: "Entertainment",
		value: "entertainment",
	},
	{
		label: "General",
		value: "general",
	},
	{
		label: "Health",
		value: "health",
	},
	{
		label: "Science",
		value: "science",
	},
	{
		label: "Sports",
		value: "sports",
	},
	{
		label: "Technology",
		value: "technology",
	},
];
