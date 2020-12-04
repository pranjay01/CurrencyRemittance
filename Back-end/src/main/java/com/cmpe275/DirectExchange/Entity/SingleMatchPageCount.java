package com.cmpe275.DirectExchange.Entity;

import java.util.List;

public class SingleMatchPageCount {
    private List<SingleMatch> list;

    private int pagecount;

    public SingleMatchPageCount() {

    }

	public SingleMatchPageCount(List<SingleMatch> list, int pagecount) {
		this.list = list;
		this.pagecount = pagecount;
	}



	public List<SingleMatch> getList() {
		return list;
	}



	public void setList(List<SingleMatch> list) {
		this.list = list;
	}



	public int getPagecount() {
		return pagecount;
	}


	public void setPagecount(int pagecount) {
		this.pagecount = pagecount;
	}

    


}
