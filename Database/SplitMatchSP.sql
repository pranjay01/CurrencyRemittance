DROP procedure getMatchingOfferSplit; 
call getMatchingOfferSplit (223,158,1,10)

delimiter //

create procedure getMatchingOfferSplit (in OfferId bigint
								, UserId bigint
                                , startindex int
                                , rowcount int)

begin

drop table if exists searchdata;
create temporary table searchdata (
    OfferID bigint,
    UserID bigint,
    SourceAmount decimal(10,2),
    DestinationAmount decimal(10,2),
    SourceCurrency varchar(10),
    DestinationCurrency varchar(10),
	MatchingDestinationAmount1 decimal(10,2),
	MatchingSourceAmount1 decimal(10,2),
	MatchingUserId1 bigint,
	MatchingOfferId1 bigint,
	MatchingNickName1 varchar(500),
	MatchningAllowCounterOffers1 tinyint,
	MatchingExchangeRate1 decimal(10,3),
	MatchingExpirationDate1 date,
    MatchingSourceCountry1 varchar(30),
	MatchingSourceCurrency1 varchar(10),
	MatchingDestinationCountry1 varchar(30),
	MatchingDestinationCurrency1 varchar(10),
	MatchingDestinationAmount2 decimal(10,2),
	MatchingSourceAmount2 decimal(10,2),
	MatchingUserId2 bigint,
	MatchingOfferId2 bigint,
	MatchingOfferNickName2 varchar(500),
	MatchningAllowCounterOffers2 tinyint,
	MatchingExchangeRate2 decimal(10,3),
	MatchingExpirationDate2 date,
    MatchingSourceCountry2 varchar(30),
	MatchingSourceCurrency2 varchar(10),
	MatchingDestinationCountry2 varchar(30),
	MatchingDestinationCurrency2 varchar(10),
	Difference decimal(10,2)
);

INSERT INTO searchdata 
SELECT
 o.OfferID,
 o.UserID, 
 o.SourceAmount, 
 o.DestinationAmount, 
 o.SourceCurrency,
 o.DestinationCurrency,
 o2.DestinationAmount as 'MatchingDestinationAmount1',
 o2.SourceAmount as 'MatchingSourceAmount1',
 o2.UserID as 'MatchingUserId1',
 o2.OfferID as 'MatchingOfferId1',
 s2.Nickname as 'MatchingNickName1',
 o2.AllowCounterOffers as 'MatchningAllowCounterOffers1',
 o2.ExchangeRate as 'MatchingExchangeRate1',
 o2.ExpirationDate as 'MatchingExpirationDate1',
 o2.SourceCountry as 'MatchingSourceCountry1',
 o2.SourceCurrency as 'MatchingSourceCurrency1',
 o2.DestinationCountry as 'MatchingDestinationCountry1',
 o2.DestinationCurrency as 'MatchingDestinationCurrency1',
 o3.DestinationAmount as 'MatchingDestinationAmount2',
 o3.SourceAmount as 'MatchingSourceAmount2',
 o3.UserID as 'MatchingUserId2',
 o3.OfferID as 'MatchingOfferId2',
 s3.Nickname as 'MatchingOfferNickName2',
 o3.AllowCounterOffers as 'MatchningAllowCounterOffers2',
 o3.ExchangeRate as 'MatchingExchangeRate2',
 o3.ExpirationDate as 'MatchingExpirationDate2',
 o3.SourceCountry as 'MatchingSourceCountry2',
 o3.SourceCurrency as 'MatchingSourceCurrency2',
 o3.DestinationCountry as 'MatchingDestinationCountry2',
 o3.DestinationCurrency as 'MatchingDestinationCurrency2',
 abs(o.SourceAmount - (o2.DestinationAmount + o3.DestinationAmount)) AS 'Difference'
FROM OFFER o 
INNER JOIN OFFER o2 ON o.DestinationCurrency = o2.SourceCurrency 
					AND o2.DestinationCurrency = o.SourceCurrency
					AND o2.OfferStatus = 'open'
INNER JOIN OFFER o3 ON o.DestinationCurrency = o3.SourceCurrency 
					AND o3.DestinationCurrency = o.SourceCurrency
					AND o3.OfferStatus = 'open'
INNER JOIN SIGNUP s2 ON s2.ID = o2.UserID
INNER JOIN SIGNUP s3 ON s3.ID = o3.UserID
WHERE o.UserID = UserId 
	AND o.OfferID = OfferId
    AND o.UserID <> o2.UserID
    AND o.UserID <> o3.UserID
    AND o3.OfferID <> o2.OfferID
    AND o2.SplitExchange = 1
    AND o3.SplitExchange = 1
    AND (o.DestinationAmount = o2.SourceAmount + o3.SourceAmount
    OR (o.DestinationAmount) between (o2.MinAmount+o3.MinAmount) and (o2.MaxAmount+o3.MaxAmount))
UNION ALL
SELECT
 o.OfferID,
 o.UserID, 
 o.SourceAmount, 
 o.DestinationAmount, 
 o.SourceCurrency,
 o.DestinationCurrency,
 o2.DestinationAmount as 'MatchingDestinationAmount1',
 o2.SourceAmount as 'MatchingSourceAmount1',
 o2.UserID as 'MatchingUserId1',
 o2.OfferID as 'MatchingOfferId1',
 s2.Nickname as 'MatchingNickName1',
 o2.AllowCounterOffers as 'MatchningAllowCounterOffers1',
 o2.ExchangeRate as 'MatchingExchangeRate1',
 o2.ExpirationDate as 'MatchingExpirationDate1',
 o2.SourceCountry as 'MatchingSourceCountry1',
 o2.SourceCurrency as 'MatchingSourceCurrency1',
 o2.DestinationCountry as 'MatchingDestinationCountry1',
 o2.DestinationCurrency as 'MatchingDestinationCurrency1',
 o3.DestinationAmount as 'MatchingDestinationAmount2',
 o3.SourceAmount as 'MatchingSourceAmount2',
 o3.UserID as 'MatchingUserId2',
 o3.OfferID as 'MatchingOfferId2',
 s3.Nickname as 'MatchingOfferNickName2',
 o3.AllowCounterOffers as 'MatchningAllowCounterOffers2',
 o3.ExchangeRate as 'MatchingExchangeRate2',
 o3.ExpirationDate as 'MatchingExpirationDate2',
 o3.SourceCountry as 'MatchingSourceCountry2',
 o3.SourceCurrency as 'MatchingSourceCurrency2',
 o3.DestinationCountry as 'MatchingDestinationCountry2',
 o3.DestinationCurrency as 'MatchingDestinationCurrency2',
 abs((o3.DestinationAmount - o2.SourceAmount)- o.SourceAmount) AS 'Difference'
FROM OFFER o 
INNER JOIN OFFER o2 ON o.DestinationCurrency = o2.DestinationCurrency 
				AND o.SourceCurrency = o2.SourceCurrency
				AND o2.OfferStatus = 'open'
                AND o2.OfferID <> o.OfferID
INNER JOIN OFFER o3 ON o.DestinationCurrency = o3.SourceCurrency 
				AND o.SourceCurrency = o3.DestinationCurrency
				AND o3.OfferStatus = 'open' 
                AND o3.UserId <> o2.UserId
                AND o3.UserId <> o.UserId
INNER JOIN SIGNUP s2 ON s2.ID = o2.UserID
INNER JOIN SIGNUP s3 ON s3.ID = o3.UserID
WHERE o.UserID = UserId 
	AND o.OfferID = OfferId
    AND o2.SplitExchange = 1
    AND o3.SplitExchange = 1
    AND (
			(o.DestinationAmount + o2.DestinationAmount)  = o3.SourceAmount
    OR (o.DestinationAmount between 
			(o3.SourceAmount - o2.DestinationAmount) - ((o3.SourceAmount - o2.DestinationAmount)*0.1)
        and (o3.SourceAmount - o2.DestinationAmount) + ((o3.SourceAmount - o2.DestinationAmount)*0.1)
        ));


SELECT * from
 (SELECT row_number() over (order by temp.Difference asc) as row_num, 
	OfferID 
    ,UserID 
    ,SourceAmount 
    ,DestinationAmount 
    ,SourceCurrency 
    ,DestinationCurrency 
	,MatchingDestinationAmount1 
	,MatchingSourceAmount1 
	,MatchingUserId1 
	,MatchingOfferId1 
	,MatchingNickName1 
	,MatchningAllowCounterOffers1 
	,MatchingExchangeRate1 
	,MatchingExpirationDate1
    ,MatchingSourceCountry1 
	,MatchingSourceCurrency1
	,MatchingDestinationCountry1
	,MatchingDestinationCurrency1 
	,MatchingDestinationAmount2 
	,MatchingSourceAmount2 
	,MatchingUserId2 
	,MatchingOfferId2 
	,MatchingOfferNickName2 
	,MatchningAllowCounterOffers2 
	,MatchingExchangeRate2 
	,MatchingExpirationDate2
    ,MatchingSourceCountry2 
	,MatchingSourceCurrency2
	,MatchingDestinationCountry2
	,MatchingDestinationCurrency2 
	,Difference 
	from searchdata temp) temp2;

select ceil(count(1)/rowcount) as pagecount from searchdata;

end //

delimiter ;