#!/bin/bash

SESSIONNAME="bgs-dev"

if ! tmux has-session -t $SESSIONNAME
then
  tmux new -s $SESSIONNAME -d
  tmux rename-window -t
  tmux split-window -t $SESSIONNAME -h -c "#{pane_current_path}"
  tmux select-pane -t $SESSIONNAME -L
  tmux send-keys -t $SESSIONNAME 'npm run shared' Enter
  tmux split-window -t $SESSIONNAME -c "#{pane_current_path}"
  tmux send-keys -t $SESSIONNAME 'npm run server' Enter
  tmux split-window -t $SESSIONNAME -c "#{pane_current_path}"
  tmux send-keys -t $SESSIONNAME 'npm run client' Enter
  tmux select-pane -t $SESSIONNAME -R
  # tmux resize-pane -t $SESSIONNAME -x 10
  tmux send-keys
fi

tmux attach -t $SESSIONNAME
