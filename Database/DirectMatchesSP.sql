DROP procedure getMatchingOfferDirect; 
call getMatchingOfferDirect (188,50,1,10)

delimiter //

create procedure getMatchingOfferDirect (in OfferId bigint
								, UserId bigint
                                , startindex int
                                , rowcount int)

begin

drop table if exists searchdata;
create temporary table searchdata
select * from (
 select  row_number() over (order by temp.Difference asc) as row_num 
	, temp.OfferID,
 temp.MatchingOfferId,
 temp.UserID, 
 temp.MatchingUserId,
 temp.SourceAmount,
 temp.MatchingSourceAmount,
 temp.DestinationAmount,
 temp.MatchingDestinationAmount,
 temp.SourceCurrency,
 temp.DestinationCurrency,
 temp.Nickname,
 temp.AllowCounterOffers,
 temp.ExchangeRate,
 temp.ExpirationDate,
 temp.Difference
 from (SELECT
 o.OfferID,
 o2.OfferID as 'MatchingOfferId',
 o.UserID, 
 o2.UserID as 'MatchingUserId',
 o.SourceAmount, 
 o2.SourceAmount as 'MatchingSourceAmount',
 o.DestinationAmount, 
 o2.DestinationAmount as 'MatchingDestinationAmount',
 o.SourceCurrency,
 o.DestinationCurrency,
 s2.Nickname,
 o2.AllowCounterOffers,
 o2.ExchangeRate,
 o2.ExpirationDate,
 abs(o.SourceAmount - o2.DestinationAmount) AS 'Difference'
FROM OFFER o 
INNER JOIN OFFER o2 ON o.DestinationCurrency = o2.SourceCurrency 
			AND o2.DestinationCurrency = o.SourceCurrency 
			AND o2.OfferStatus = 'open'
INNER JOIN SIGNUP s2 ON s2.ID = o2.UserID
WHERE o.UserID = UserId
	AND o.OfferID = OfferId
    AND o.UserID <> o2.UserID
    AND (o.DestinationAmount = o2.SourceAmount
    OR o.DestinationAmount between o2.MinAmount and o2.MaxAmount
    ) ) temp
) temp2 Order by row_num ASC;

SELECT * from searchdata;

select ceil(count(1)/rowcount) as pagecount from searchdata;

end //

delimiter ;