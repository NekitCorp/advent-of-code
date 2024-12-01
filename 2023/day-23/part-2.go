package main

import (
	"fmt"
	"os"
	"strings"
	"time"
)

type Point struct {
	x int
	y int
}

var input, _ = os.ReadFile("./day-23/input.txt")
var rows = strings.Split(string(input), "\n")
var start, end = Point{1, 0}, Point{len(rows[0]) - 2, len(rows) - 1}

func main() {
	visited := make([][]bool, len(rows))
	for i := range visited {
		visited[i] = make([]bool, len(rows[0]))
	}

	startTime := time.Now()
	fmt.Println(dfs(start, visited, 0))
	elapsed := time.Since(startTime)
	fmt.Printf("Time %s", elapsed)
}

func dfs(
	point Point,
	visited [][]bool,
	steps int,
) int {
	if point.y < 0 || point.y >= len(rows) || point.x < 0 || point.x >= len(rows[0]) {
		return -1
	}

	if visited[point.y][point.x] {
		return -1
	}

	if rows[point.y][point.x] == '#' {
		return -1
	}

	if point == end {
		return steps
	}

	visited[point.y][point.x] = true
	result := max(
		dfs(Point{point.x, point.y + 1}, visited, steps+1),
		dfs(Point{point.x, point.y - 1}, visited, steps+1),
		dfs(Point{point.x + 1, point.y}, visited, steps+1),
		dfs(Point{point.x - 1, point.y}, visited, steps+1),
	)
	visited[point.y][point.x] = false

	return result
}
