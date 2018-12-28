import * as d3 from 'd3';
import './d3.scss';

const data = {
    name: '0',
    children: [
        {
            name: '0-0',
            children: [
                {
                    name: '0-0-0'
                },
                {
                    name: '0-0-1'
                },
                {
                    name: '0-0-2'
                }
            ]
        },
        {
            name: '0-1',
            children: [
                {
                    name: '0-1-0'
                },
                {
                    name: '0-1-1'
                },
                {
                    name: '0-1-2'
                }
            ]
        },
        {
            name: '0-2',
        },
        {
            name: '0-3'
        }
    ]
};

const width = 700,
    height = 700;

const tree = d3.tree()
    .size([width, height]);

const diagonal = d3.linkHorizontal()
    .x(function (d) { return d.y; })
    .y(function (d) { return d.x; });

const svg = d3.select("#root").append("svg")
    .attr("width", width + 800)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(40,0)");

const nodes = d3.hierarchy(data, d => d.children);

const treeNodes = tree(nodes);

// 创建线条
svg.selectAll(".link")
    .data(treeNodes.links())
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", diagonal);

// 创建节点
const node = svg.selectAll(".node")
    .data(treeNodes.descendants())
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; });

// 节点添加圆圈
node.append("circle")
    .attr("r", 4.5);

// 节点添加文本描述
node.append("text")
    .attr("dx", 0)
    .attr("dy", -8)
    .style("text-anchor", 'middle')
    .text(function (d) { return d.data.name; });