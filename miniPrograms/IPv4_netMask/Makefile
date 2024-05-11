run: main.o Network.o
	g++ -o run main.o Network.o

main.o: main.cpp Network.hpp
	g++ -c -Wall -ansi -pedantic -std=c++20 main.cpp

Network.o: Network.cpp Network.hpp
	g++ -c -Wall -ansi -pedantic -std=c++20 Network.cpp

clean:
	/bin/rm -f *.o run *~