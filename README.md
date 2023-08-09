问题总结



# /store/v3/tmp/xxx

![681691519077_.pic](./681691519077_.pic.jpg)

第一个store/v3/tmp/dlx-71788/node_modules/.pnpm 是不是一个临时的全局位置？

在 `/Users/fangxinyi/Library/pnpm/store/v3/tmp` 目录中，pnpm 会存储一些临时文件，例如正在下载的包、解压缩的包等。这些临时文件在安装或更新包时会被使用，并在完成后被清理或移动到其他位置。

此外，pnpm 还会在该目录中缓存已下载的包，以便在后续的安装过程中可以直接使用缓存，而无需重新下载。这有助于提高包的安装速度，并减少网络流量。



# postinstall

第二个，注意esbuild：Running postinstall script 

https://juejin.cn/post/7142397455597109279



# pnpm add 某个包的截图

安装

![image-20230809023548716](./image-20230809023548716.png)

![image-20230809031609424](./image-20230809031609424.png)

# pnpm-workspace.yaml

```yaml
packages:
  # all packages in direct subdirs of packages/
  - 'packages/*'
  # all packages in subdirs of components/
  - 'components/**'
  # exclude packages that are inside test directories
  - '!**/test/**'
```

```
- components
  - component1
  	- package.json
  	- component4
      - package.json
  - component2
    - package.json
  - component3
    - package.json
  - components1
    
```

当您在工作区的根目录中运行 `pnpm install` 命令时，pnpm 会自动识别 `components/**` 模式，并进入每个匹配的子目录执行包的安装。这意味着 `components1/components4` 目录中的 `package.json` 文件定义的依赖将被安装。

这里得自己试一试，试完了，确实是这样的

pnpm install安装







# pnpm add 对比npm install

在使用 `pnpm add` 命令安装包时，pnpm 会按照以下优先级顺序获取资源：

1. 本地缓存：pnpm 首先检查本地缓存，即位于 `~/.pnpm-store` 目录下的缓存。如果所需的包已经存在于缓存中，pnpm 将直接从缓存中获取资源，而无需重新下载。
2. 远程注册表：如果所需的包不在本地缓存中，pnpm 将尝试从远程注册表（如 npm registry）获取资源。它会向注册表发送请求，以获取包的元数据和可用版本信息。
3. 依赖树：如果包的依赖已经在项目的依赖树中存在，pnpm 将直接从依赖树中获取资源。这意味着如果项目中的其他依赖已经安装了所需的包，pnpm 将重用这些已安装的依赖，而不是重新下载。
4. 远程源码：如果以上步骤都无法获取资源，pnpm 将尝试从远程源码获取资源。它会从包的源代码仓库（如 GitHub）下载源代码，并根据需要进行构建和安装。

总的来说，pnpm 在安装包时会优先使用本地缓存和已安装的依赖，以提高安装速度和节省网络流量。只有当所需的包不在本地缓存或依赖树中时，pnpm 才会从远程注册表或远程源码获取资源。这种优先级顺序可以帮助提高包的安装效率，并减少对网络的依赖。



# pnpm复用

```
Progress: resolved 901, reused 880, downloaded 0, added 880, done
```

- "resolved 901"：表示已解析（resolved）的包的数量，即**已确定要安装的包的数量**。
- "reused 880"：表示已重用（reused）的包的数量，即**已经存在于本地缓存中的包的数量**。这些包不需要重新下载，而是直接从缓存中复用。
- "downloaded 0"：表示已下载（downloaded）的包的数量，即**需要从远程注册表下载的包的数量**。在这个例子中，没有需要下载的包，因为所有的包要么已经存在于本地缓存中，要么被重用。
- "added 880"：表示已添加（added）的包的数量，即**需要被安装的包的数量**。这包括从本地缓存中复用的包和从远程注册表下载的包。
- "done"：表示安装过程已完成，所有需要安装的包都已经处理完毕。

```
为什么这里resolved的数量不等于added的数量
```

1. 重用已存在的包：在安装过程中，pnpm 会检查本地缓存中是否已经存在所需的包。如果已经存在，它将被重用，而不需要重新下载。这些被重用的包会计入 "resolved" 数量，但不会计入 "added" 数量。
2. 依赖的版本范围：在 package.json 文件中，您可能指定了依赖的版本范围，而不是具体的版本号。当 pnpm 解析依赖关系时，它会根据版本范围确定要安装的具体版本。因此，"resolved" 数量表示已解析的包的数量，而 "added" 数量表示实际要安装的包的数量。
3. 依赖的共享：如果多个包依赖同一个包，并且这些包的版本范围是兼容的，pnpm 可能会共享这个包，而不是为每个包都安装一个副本。这样可以减少磁盘空间的占用。在这种情况下，"resolved" 数量可能会大于 "added" 数量。

总之，"resolved" 数量表示已解析的包的数量，而 "added" 数量表示实际要安装的包的数量。差异可能是由于重用已存在的包、依赖的版本范围和依赖的共享等因素导致的。这些差异并不表示错误，而是 pnpm 在安装过程中的优化和处理方式。



# link

```json
"dependencies": {
    "@components/core": "workspace:^",
    "@components/utils": "workspace:^",
    "test": "link:@components/core/test",
    "uu": "link:@components/utils/uu",
    "vue": "^3.3.4"
  },
```

这个link是什么意思

在上述代码中，"test": "link:@components/core/test" 中的 "link" 是指使用符号链接（symbolic link）的方式来引用依赖。

当使用 "link" 作为依赖的安装方式时，它会创建一个符号链接，将依赖包链接到当前项目中。这意味着，当您在项目中引用 "test" 依赖时，实际上会使用 "@components/core/test" 的代码和文件，而不是从外部依赖中复制一份。

这种方式常用于开发过程中，当您正在开发一个依赖包，并希望在项目中实时使用最新的代码时，可以使用符号链接来引用依赖。这样，对依赖包的修改会立即反映在项目中，无需手动进行复制或重新安装。

需要注意的是，使用符号链接方式引用依赖需要确保依赖包已经被正确地链接到项目中。通常，您需要在依赖包的根目录中运行 `npm link` 或 `pnpm link` 命令，将依赖包链接到全局或本地的包管理器中。然后，在项目中使用 "link" 形式的依赖声明，以确保正确引用依赖。

总结起来，"link:@components/core/test" 表示使用符号链接的方式引用 "@components/core/test" 依赖包，使项目中的 "test" 依赖直接指向该依赖包的代码和文件。



# npm/yarn迁移pnpm

https://juejin.cn/post/7129552750446116878



https://blog.lyh543.cn/posts/2022-04-18-migrate-npm-multirepo-to-pnpm-monorepo.html

在一个 pnpm workspace 中敲下 `pnpm install`，会发生：

1. workspace 里的所有包的外部依赖都会被下载到 workspace 的根目录的 `node_modules` 下。
2. 所有包的外部依赖都会在包的 `node_modules` 下，以软链接的形式 link 到 workspace 的根目录的 `node_modules` 下。
3. workspace 内部的相互依赖，会按照 `package.json` 中版本号的写法，完成从 registry 安装（就是步骤 1），或是本地 link。



# package.json中scripts特殊项

在 `package.json` 文件的 `scripts` 字段中，有一些特殊的脚本项，它们在特定的时机或条件下会被自动执行。以下是其中一些常见的特殊脚本项：

1. `preinstall`：在安装依赖包之前执行的脚本。通常用于在安装过程中执行一些准备工作或检查操作。
2. `postinstall`：在安装依赖包之后执行的脚本。通常用于在安装完成后进行一些额外的配置或构建操作。
3. `preuninstall`：在卸载依赖包之前执行的脚本。通常用于在卸载过程中执行一些清理操作。
4. `postuninstall`：在卸载依赖包之后执行的脚本。通常用于在卸载完成后进行一些额外的清理操作。
5. `prepublish`：在将包发布到注册表之前执行的脚本。通常用于在发布前进行构建、测试或其他准备工作。
6. `prepare`：在安装或更新依赖包时执行的脚本。通常用于在安装或更新过程中进行构建、编译或其他准备工作。

这些特殊脚本项可以在 `scripts` 字段中定义，并在特定的时机或条件下自动执行。它们提供了一种方便的方式来定义和执行与包的生命周期相关的操作，例如在安装、卸载、构建或发布过程中执行一些自定义的脚本逻辑。



# pnpm import 

pnpm import 是 pnpm 包管理器提供的一个指令，用于将已经存在于项目中的依赖包转换为 pnpm 的本地包。





# 稿子



