#include <iostream>

using namespace std;

int setOfDecimal = 0; //use to calculate address length
int addressLen = -1;
int hostBits = 0;
int networkBits = 0;


//function prints out the amount of host bits and host amount
void getNetMaskInfo(string binaryNum)
{
    //host info
    for (int i=0; i<binaryNum.length();i++)
        if (binaryNum[i]=='0')
            hostBits++;

    cout << "host bit(s): " << hostBits << endl;
    cout << "host amount: " << pow(2,hostBits) << " host(s)" << endl;


    //network info
    networkBits = addressLen - hostBits;
    
    cout << "network bit(s): " << networkBits << endl;
    cout << "network amount: " << pow(2,networkBits) << " network(s)" << "\n\n";
}

//function that ensure binary number is in sets of 8
string appendMissingZeros(string &binaryNum)
{
    // don't need zeros
    if (binaryNum.length()%8 == 0)
        return binaryNum;

    // append missing zeros
    int missingZero = 8-(binaryNum.length()%8);
    for (int i=0; i<missingZero; i++)
        binaryNum += "0";

    return binaryNum;
}

//function that returns binary equivalence given base 10 number
string decimal2Binary(string decimalNum)
{
    //base case: no conversion necessary
    if (stoi(decimalNum) == 0)
        return "00000000";


    string binaryNum;
    int base = 2;
    int remainder = -1;
    int quotient = stoi(decimalNum);


    //repeated divison
    while (quotient!=0)
    {
        remainder = quotient%base;
        quotient /= base;
        binaryNum += to_string(remainder);
    }


    //make sure binary number is multiple of 8
    appendMissingZeros(binaryNum);


    //reverse result to get binary number using two pointer approach
    for (int start = 0, end = binaryNum.length()-1; start<end; start++, end--)
        swap(binaryNum[start], binaryNum[end]);


    return binaryNum;
}

//functino that convert binary values to decimal values
string binary2Decimal(string binaryNum)
{
    int decimalNum = 0;

    //base expansion
    for(int index=0, power = binaryNum.length()-1; index < binaryNum.length(); index++, power--)
    {
        if (binaryNum[index] == '1')
            decimalNum += pow(2,power);
    }

    return to_string(decimalNum);
}

//function that returns binary equivalence and set the address length
string toBinary(string str, bool address)
{
    string binaryNum;
    string decimalNum;

    for (int i=0; i<=str.length();i++)
    {
        if (str[i] != '.' && str[i] != '\n')
            decimalNum += str[i];
        else
        {
            binaryNum += decimal2Binary(decimalNum);

            if (address)
                setOfDecimal++;

            decimalNum = ""; //clear
        }
    }
    binaryNum += decimal2Binary(decimalNum); //convert the last set of decimal

    if (address)
    {
        setOfDecimal++;
        addressLen = setOfDecimal * 8;
    }

    return binaryNum;
}

//function that nicely format host ID
string formatHostID(string hostID)
{
    double counter = (addressLen-hostBits)/8;

    string hostID_head;
    for (int i=0; i<counter; i++)
        hostID_head += "0.";
    
    return (hostID_head + hostID);
}

//function that gets the host ID given address
string getHostID(string addressBinary)
{
    string hostID;

    for (int i=addressLen-hostBits; i<addressLen; i++)
        hostID += addressBinary[i];

    return formatHostID(binary2Decimal(hostID));
}

//function that gets the network ID given address
string getNetworkID(string addressBinary)
{
    string networkIDBinary;
    string networkID;

    for (int i=0; i<networkBits; i++)
    {
        networkIDBinary += addressBinary[i];

        if ((i+1)%8 == 0)
        {
            networkID += binary2Decimal(networkIDBinary) += '.';

            networkIDBinary = ""; //clear it for next 8
        }
    }
    //handle last batch
    if (networkBits%8!=0)
        networkID += binary2Decimal(networkIDBinary); 

    return networkID;
}


int main(int argc, char* argv[])
{
    //prompt user for IPv4 net mask and address
    string netMask, address;   
     
    cout << "Enter IPv4 net mask: ";
    cin >> netMask;

    cout << "Enter IPv4 address: ";
    cin >> address;

    cout << "IPv4 net mask: " << netMask << endl;
    cout << "IPV4 address : " << address << "\n\n";

    //STEP 1: turn net mask and address into binary
    string netMaskBinary = toBinary(netMask, false);
    string addressBinary = toBinary(address, true);

   

    //STEP 2: identify the num of host bit(s) and network bit(s) of the given net mask
    getNetMaskInfo(netMaskBinary);

    //STEP 3: identify the network ID and host ID of the given net mask and address
    string hostID;
    string networkID;

    cout << "hostID: " << getHostID(addressBinary) << endl;
    cout << "NetworkID: " << getNetworkID(addressBinary) << endl;

    return 0;
}
