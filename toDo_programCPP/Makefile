# This is (at least the start of) a makefile for CSC45500, 
#   project#1
## NOTE: any LINE starting with a '#' in a Makefile is a comment

#OPTIM=-O
DBG=-g
OPTS=$(DBG) $(OPTIM) -Wall -ansi -pedantic -std=c++20

CC=g++ $(OPTS)  -c
LNK=g++

OBJS=main.o

run: $(OBJS)
	$(LNK) -o run $(OBJS)

main.o: main.cpp
	$(CC) main.cpp

clean:
	/bin/rm -f *.o run *~
