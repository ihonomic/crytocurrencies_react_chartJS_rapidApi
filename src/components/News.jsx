import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetNewsQuery } from "../services/cryptoNews";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Loader } from ".";
const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const { data } = useGetCryptosQuery(100);

  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const count = simplified ? 6 : 12;
  const { data: cryptoNews, isFetching } = useGetNewsQuery({
    newsCategory: newsCategory,
    count: count,
  });

  if (isFetching) {
    return <Loader />;
  }
  if (!cryptoNews?.value) return <Loader />;

  const demoImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4PoT7dO5_vHjyqDzck-PacCn4Q2-UmfltdQ&usqp=CAU";
  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a News Category"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {/* <Option value="Messi">Lionel Messi</Option> */}
            {data?.data?.coins?.map((coin, index) => (
              <Option value={coin.name} key={index}>
                {coin.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
                <img
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt=""
                />
              </div>
            </a>
            {/* target='_blank',  rel="noreferrer" used in anchor to open in a new card */}
            <p>
              {news.description.length > 100
                ? `${news.description.substring(0, 100)} ...`
                : news.description}
            </p>
            <div className="provider-container">
              <div>
                <Avatar
                  src={
                    news.provider[0]?.image?.thumbnail?.contentUrl || demoImage
                  }
                  alt=""
                />
                <Text className="provider-name">{news.provider[0]?.name}</Text>
              </div>
              <Text>{moment(news.datePublished).startOf("ss").fromNow()}</Text>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
