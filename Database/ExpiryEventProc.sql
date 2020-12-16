delimiter //

create procedure ExpiryEventProc()

begin

   UPDATE COUNTER_OFFER SET Accepted = 2 
   WHERE DATE_ADD(Created_Date, INTERVAL 5 minute) <= current_timestamp()
   AND Accepted = 0;
   
   UPDATE OFFER O
   INNER JOIN COUNTER_OFFER CO ON CO.CounterOfferID = O.OfferID
   SET O.OfferStatus = 'open'
   WHERE DATE_ADD(CO.Created_Date, INTERVAL 5 minute) <= current_timestamp()
   AND O.OfferStatus = 'counterMade';
   
   UPDATE TRANSACTION T SET TransactionStatus = 'Expired' 
   WHERE DATE_ADD(T.Created_Date, INTERVAL 10 minute) <= current_timestamp()
   AND T.TransactionStatus LIKE 'Pending';
   
   UPDATE OFFER O
   INNER JOIN TRANSACTION T ON T.OfferID = O.OfferID
   SET O.OfferStatus = 'open'
   WHERE DATE_ADD(T.Created_Date, INTERVAL 10 minute) <= current_timestamp()
   AND O.OfferStatus like 'inTransaction';
   
   UPDATE OFFER O SET O.OfferStatus = 'expired'
   WHERE O.ExpirationDate <= current_date()
   AND O.OfferStatus like 'open';
   
end //

delimiter ;