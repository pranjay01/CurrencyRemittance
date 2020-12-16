package com.cmpe275.DirectExchange.Service;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.cmpe275.DirectExchange.Entity.SplitMatch;
import com.cmpe275.DirectExchange.Entity.SplitMatchPageCount;

import org.springframework.beans.factory.annotation.Value;

public class SplitMatchProc {

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;


    public SplitMatchPageCount getSplitMatch(Long OfferId, Long UserId, int startindex, int rowcount) {
        Connection conn = null;
        String url ="jdbc:mysql://currency-remittance.ccqrmksnmmm6.us-east-2.rds.amazonaws.com:3306/DIRECT_EXCHANGE";
        String username = "happy";
        String password = "birthday";
        List<SplitMatch> split = new ArrayList<SplitMatch>();
        SplitMatchPageCount sp = null;
        try {
            conn = DriverManager.getConnection(url, username, password);
            CallableStatement statement = conn.prepareCall("{call getMatchingOfferSplit(?, ?, ?, ?)}");

            statement.setLong(1, OfferId);
            statement.setLong(2, UserId);
            statement.setInt(3, startindex);
            statement.setInt(4, rowcount);

            ResultSet rs = statement.executeQuery();
            
            System.out.println(rs);
            
            while(rs.next()) {
                SplitMatch result = new SplitMatch();
                result.setRow_num(rs.getInt("row_num"));
                result.setOfferID(rs.getLong("OfferID"));
                result.setUserID(rs.getLong("UserID"));
                result.setSourceAmount(rs.getDouble("SourceAmount"));
                result.setDestinationAmount(rs.getDouble("DestinationAmount"));
                result.setSourceCurrency(rs.getString("SourceCurrency"));
                result.setDestinationCurrency(rs.getString("DestinationCurrency"));
                result.setMatchingDestinationAmount1(rs.getDouble("MatchingDestinationAmount1"));
                result.setMatchingSourceAmount1(rs.getDouble("MatchingSourceAmount1"));
                result.setMatchingUserId1(rs.getLong("MatchingUserId1"));
                result.setMatchingOfferId1(rs.getLong("MatchingOfferId1"));
                result.setMatchingNickName1(rs.getString("MatchingNickName1"));
                result.setMatchningAllowCounterOffers1(rs.getInt("MatchningAllowCounterOffers1"));
                result.setMatchingExchangeRate1(rs.getDouble("MatchingExchangeRate1"));
                result.setMatchingExpirationDate1(rs.getString("MatchingExpirationDate1"));
                result.setMatchingSourceCountry1(rs.getString("MatchingSourceCountry1"));
                result.setMatchingSourceCurrency1(rs.getString("MatchingSourceCurrency1"));
                result.setMatchingDestinationCountry1(rs.getString("MatchingDestinationCountry1"));
                result.setMatchingDestinationCurrency1(rs.getString("MatchingDestinationCurrency1"));
                result.setMatchingDestinationAmount2(rs.getDouble("MatchingDestinationAmount2"));
                result.setMatchingSourceAmount2(rs.getDouble("MatchingSourceAmount2"));
                result.setMatchingUserId2(rs.getLong("MatchingUserId2"));
                result.setMatchingOfferId2(rs.getLong("MatchingOfferId2"));
                result.setMatchingOfferNickName2(rs.getString("MatchingOfferNickName2"));
                result.setMatchningAllowCounterOffers2(rs.getInt("MatchningAllowCounterOffers2"));
                result.setMatchingExchangeRate2(rs.getDouble("MatchingExchangeRate2"));
                result.setMatchingExpirationDate2(rs.getString("MatchingExpirationDate2"));
                result.setMatchingSourceCountry2(rs.getString("MatchingSourceCountry2"));
                result.setMatchingSourceCurrency2(rs.getString("MatchingSourceCurrency2"));
                result.setMatchingDestinationCountry2(rs.getString("MatchingDestinationCountry2"));
                result.setMatchingDestinationCurrency2(rs.getString("MatchingDestinationCurrency2"));

                result.setDifference(rs.getDouble("Difference"));
                
                boolean flag = false;
                if(split.size() > 0){
                    for(SplitMatch s : split){
                        if(s.compareTo(result) != 0){
                            flag = true;
                        }
                    }
                } else {
                    split.add(result);
                }
                if(flag){
                    split.add(result);
                }
            }

            statement.getMoreResults();
            ResultSet rs2 = statement.getResultSet();
            rs2.next();
            sp = new SplitMatchPageCount(split,rs2.getInt("pagecount"));

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
