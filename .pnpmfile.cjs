module.exports = {
  hooks: {
    readPackage(pkg) {
      if (pkg.dependencies) {
        Object.keys(pkg.dependencies).forEach(dep => {
          if (pkg.dependencies[dep] === 'workspace:*') {
            pkg.dependencies[dep] = '*'
          }
        })
      }
      return pkg
    }
  }
}
