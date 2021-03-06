DROP database if EXISTS DIRECT_EXCHANGE;

CREATE database DIRECT_EXCHANGE;

use DIRECT_EXCHANGE;

CREATE TABLE SIGNUP
(
ID BIGINT AUTO_INCREMENT,
UserName VARCHAR(30) UNIQUE  NOT NULL,
Nickname VARCHAR(25) UNIQUE  NOT NULL,
Password VARCHAR(100) NOT NULL,
Status enum('Pending', 'Verified'),
PRIMARY KEY (ID)
);

CREATE TABLE ACCOUNT
(
AccountID BIGINT AUTO_INCREMENT,
UserID BIGINT NOT NULL,
BankName VARCHAR(50) NOT NULL,
Country VARCHAR(30) NOT NULL,
AccountNumber BIGINT UNIQUE NOT NULL,
Owner VARCHAR(50) NOT NULL,
Address VARCHAR(70) NOT NULL,
PrimaryCurrency VARCHAR(10) NOT NULL,
AccountType enum('sending', 'receiving', 'both'),
PRIMARY KEY (AccountID)
);

CREATE TABLE EXCHANGE_RATE
(
ExchangeID BIGINT AUTO_INCREMENT,
CurrencyType VARCHAR(10) NOT NULL,
USDConversionRate DECIMAL(10,2) NOT NULL,
PRIMARY KEY (ExchangeID)
);

CREATE TABLE OFFER
(
OfferID BIGINT AUTO_INCREMENT,
UserID BIGINT NOT NULL,
SourceCountry VARCHAR(30) NOT NULL,
SourceCurrency VARCHAR(10) NOT NULL,
SourceAmount DECIMAL(10,2) NOT NULL,
DestinationCountry VARCHAR(30) NOT NULL,
DestinationCurrency VARCHAR(10) NOT NULL,
ExchangeRate DECIMAL(10,2) NOT NULL,
ExpirationDate DATE NOT NULL,
AllowCounterOffers BOOLEAN DEFAULT 1,
SplitExchange BOOLEAN DEFAULT 1,
OfferStatus enum ('open', 'fulfilled', 'expired'),
ServiceFee DECIMAL(10,2) NOT NULL,
MinAmount DECIMAL(10,2) NOT NULL,
MaxAmount DECIMAL(10,2) NOT NULL,
PRIMARY KEY (OfferID)
);

CREATE TABLE COUNTER_OFFER
(
ID BIGINT AUTO_INCREMENT,
OfferID BIGINT NOT NULL,
CounterProposedAmount DECIMAL(10,2) NOT NULL,
Accepted BOOLEAN DEFAULT 0,
UserID BIGINT NOT NULL,
PRIMARY KEY (ID)
);

CREATE TABLE EXCHANGE_TRANSACTION
(
TransactionID BIGINT AUTO_INCREMENT,
OfferID BIGINT NOT NULL,
Status enum ('Pending', 'Done'),
MoneyReceived enum ('SendingParty', 'ReceivingParty'),
PRIMARY KEY (TransactionID)
);

CREATE TABLE TRANSACTION_USER_MAP
(
ID BIGINT AUTO_INCREMENT,
TransactionID BIGINT NOT NULL,
UserID BIGINT NOT NULL,
PRIMARY KEY (ID),
UNIQUE KEY `transaction_user` (`TransactionID`,`UserID`)
);

