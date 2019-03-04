
## About
TODO

## Demos
1. [https://haraka.ml to test PMF ERP](https://haraka.ml/)
2. [https://fastdemo.tk/ to test PMF of knowledge base](https://fastdemo.tk/)
3. [http://assetmanagement.tk/ to test PMF of Fixed Asset Management only](http://assetmanagement.tk)
4. [http://harakafmcg.tk/ to test PMF of FMCG features](http://harakafmcg.tk/)

## Landing Page
- https://haraka.tk/

### Containers
#### Vagrant
TODO

#### Docker
TODO

### Setup
TODO

### Usage
TODO

### Technology stack
TODO

### CI-CD-CD
TODO Continuous Integration-Continuous Deployment-Continuous Delivery

### Deploy to Production server
TODO

### [Secret file](https://git-secret.io)

- [Setup git-secret](https://git-secret.io)
- [Generating a new GPG key](https://help.github.com/en/articles/generating-a-new-gpg-key)
- [Deleting GPG keys](https://superuser.com/a/594220/98774)
- [Quick'n easy gpg cheatsheet](http://irtfweb.ifa.hawaii.edu/~lockhart/gpg/)
- [gpg-import-and-export-instructions](https://gist.github.com/chrisroos/1205934)

```bash
Employeess.
# Begin with an existing or new git repository.
cd /path/to/root/of/repo 

# Initialize the git-secret repository by running
# command automatically adds .gitsecret/keys/random_seed file added to .gitignore file. 
git secret init 

# Add the first user to the git-secret repo keyring
git secret tell your@gpg.Employee.

# add files you wish to encrypt inside the git-secret repository
# can only add files that have been put into .gitignore as secret files
git secret add filename1 filename2 ...

# to encrypt all files which you have added by the git secret add command.
git secret hide 

# decrypt files 
git secret reveal 

# show their contents to stdout
git secret cat /path/to/filename
```

# References
TODO
