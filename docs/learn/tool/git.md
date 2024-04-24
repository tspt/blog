---
title: Git
meta:
  - name: description
    content: Sth. I Like
  - name: keywords
    content: tool,git
---

## branch

```
// 创建分支
git branch myBranch
// 切换到该分支
git checkout myBranch

// 创建分支并切换到该分支
git checkout -b myBranch


// 删除该分支
git branch -d myBranch
```

## merge

```
// 合并目标分支到该分支（HEAD所指向分支）
git merge myBranch
```

## add

```
git add .
git add 文件

git status

// 修复当前提交的错误
git commit --amend
```

```
// 撤销最新的提交
git reset --hard 目标commit


// 私有分支撤销，修改后，push -f


// 反转目标commit的提交，达到重置效果，针对master分支上出错的内容进行撤销
git revert 目标commit
```

```
// 临时存放工作目录的改动
git stash
// 临时存放工作目录的改动 （包含未被add的文件）
git stash -u
// 切回分支后
git stash pop

```
