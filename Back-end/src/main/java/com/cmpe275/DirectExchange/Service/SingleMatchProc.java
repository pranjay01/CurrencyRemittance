package com.cmpe275.DirectExchange.Service;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.cmpe275.DirectExchange.Entity.SingleMatch;
import com.cmpe275.DirectExchange.Entity.SingleMatchPageCount;

import org.springframework.beans.factory.annotation.Value;

public class SingleMatchProc {

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;


    public SingleMatchPageCount getSingleMatch(Long OfferId, Long UserId, int startindex, int rowcount) {
        Connection conn = null;
        String url ="jdbc:mysql://currency-remittance.ccqrmksnmmm6.us-east-2.rds.amazonaws.com:3306/DIRECT_EXCHANGE";
        String username = "happy";
        String password = "birthday";
        List<SingleMatch> single = new ArrayList<SingleMatch>();
        SingleMatchPageCount sp = null;
        try {
            conn = DriverManager.getConnection(url, username, password);
            CallableStatement statement = conn.prepareCall("{call getMatchingOfferDirect(?, ?, ?, ?)}");

            statement.setLong(1, OfferId);
            statement.setLong(2, UserId);
            statement.setInt(3, startindex);
            statement.setInt(4, rowcount);

            ResultSet rs = statement.executeQuery();
            
            System.out.println(rs);
            
            while(rs.next()) {
                SingleMatch result = new SingleMatch();
                result.setRow_num(rs.getInt("row_num"));
                result.setMatchingOfferId(rs.getLong("MatchingOfferId"));
                result.setOfferID(rs.getLong("OfferID"));
                result.setUserID(rs.getLong("UserID"));
                result.setMatchingUserId(rs.getLong("MatchingUserId"));
                result.setSourceAmount(rs.getDouble("SourceAmount"));
                result.setMatchingSourceAmount(rs.getDouble("MatchingSourceAmount"));
                result.setDestinationAmount(rs.getDouble("DestinationAmount"));
                result.setDestinationAmount(rs.getDouble("MatchingDestinationAmount"));
                result.setSourceCurrency(rs.getString("SourceCurrency"));
                result.setDestinationCurrency(rs.getString("DestinationCurrency"));
                result.setNickname(rs.getString("Nickname"));
                result.setAllowCounterOffers(rs.getInt("AllowCounterOffers"));
                result.setExchangeRate(rs.getDouble("ExchangeRate"));
                result.setExpirationDate(rs.getString("ExpirationDate"));
                result.setDifference(rs.getDouble("Difference"));
                single.add(result);
                
            }

            statement.getMoreResults();
            ResultSet rs2 = statement.getResultSet();
            rs2.next();
            sp = new SingleMatchPageCount(single,rs2.getInt("pagecount"));

            statement.close();
            
        } catch (SQLException ex) {
            ex.printStackTrace();
        } finally {
            
                if(conn != null) {
                    try {
						conn.close();
					} catch (SQLException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
                }
            
        }
        return sp;
    }
}
