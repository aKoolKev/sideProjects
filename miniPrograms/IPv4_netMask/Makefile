run: main.o
	g++ -o run main.o

main.o: main.cpp
	g++ -c -Wall -ansi -pedantic -std=c++20 main.cpp

clean:
	/bin/rm -f *.o run *~