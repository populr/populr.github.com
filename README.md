# developers.populr.me Documentation

## Setup (Important!!!)

Create and chmod a+x a post-commit hook with the code:

    #!/usr/bin/env bash

    exec < /dev/tty
    while true; do
        read -p "Do you wish to publish this commit to the live docs site? (y or n) " yn
        case $yn in
            [Yy]* ) break;;
            [Nn]* ) exit;;
            * ) echo "Please answer y or n.";;
        esac
    done

    # executables prefix
    _prefix="/usr/bin"
    # git executable
    _git="git"

    # site generation executable
    _generate="jekyll"
    # options for the generator
    _opts=(--no-safe --no-server --no-auto --kramdown)

    # branch from which to generate site
    _origbranch="src"
    # branch holding the generated site
    _destbranch="master"

    # directory holding the generated site -- should be outside this repo
    _site="$("$_prefix/mktemp" -d /tmp/_site.XXXXXXXXX)"
    # the current branch
    _currbranch="$(grep "^*" < <("$_git" branch) | cut -d' ' -f2)"

    if [[ $_currbranch == $_origbranch ]]; then # we should generate the site
        # go to root dir of the repo
        cd "$("$_git" rev-parse --show-toplevel)"
        # generate the site
        "$_generate" ${_opts[@]} . "$_site"
        # switch to branch the site will be stored
        "$_git" checkout "$_destbranch"
        # overwrite existing files
        builtin shopt -s dotglob
        cp -rf "$_site"/* .
        builtin shopt -u dotglob
        # add any new files
        "$_git" add .
        # commit all changes with a default message
        "$_git" commit -a -m "updated site @ $(date +"%F %T")"
        # cleanup
        rm -rfv "$_site"
        # return
        "$_git" checkout "$_origbranch"
    fi


# Jekyll-Bootstrap

The quickest way to start and publish your Jekyll powered blog. 100% compatible with GitHub pages

## Usage

For all usage and documentation please see: <http://jekyllbootstrap.com>

## Version

0.2.13 - stable and versioned using [semantic versioning](http://semver.org/).

## Contributing 

This repository tracks 2 projects:

- **Jekyll-Bootstrap Framework.**  
  The framework for which users should clone and build their blog on top of is available in the master branch.
  
  To contribute to the framework please make sure to checkout your branch based on `jb-development`!!
  This is very important as it allows me to accept your pull request without having to publish a public version release.
  
  Small, atomic Features, bugs, etc.   
  Use the `jb-development` branch but note it will likely change fast as pull requests are accepted.   
  Please rebase as often as possible when working.   
  Work on small, atomic features/bugs to avoid upstream commits affecting/breaking your development work.
  
  For Big Features or major API extensions/edits:   
  This is the one case where I'll accept pull-requests based off the master branch.
  This allows you to work in isolation but it means I'll have to manually merge your work into the next public release.
  Translation : it might take a bit longer so please be patient! (but sincerely thank you).
 
- **Jekyll-Bootstrap Documentation Website.**    
  The documentation website at <http://jekyllbootstrap.com> is maintained in the gh-pages branch.
  Please fork and contribute documentation additions to this branch only.

The master and gh-pages branch do not share the same ancestry. Please treat them as completely separate git repositories!


## License

[Creative Commons](http://creativecommons.org/licenses/by-nc-sa/3.0/)
