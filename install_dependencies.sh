#!/bin/bash

# 定义要安装的 npm 包
packages=(
  "express"
  "nodemon"
  "helmet"
  "mysql2"
  "axios"
  "body-parser"
  "cors"
)

# 循环安装每个包
for package in "${packages[@]}"; do
  npm install "$package"
  if [ $? -ne 0 ]; then
    echo "安装 $package 失败"
    exit 1
  fi
  echo "$package 安装成功"
done

echo "所有依赖安装完成"