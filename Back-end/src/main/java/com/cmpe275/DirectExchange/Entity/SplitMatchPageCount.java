package com.cmpe275.DirectExchange.Entity;

import java.util.List;

public class SplitMatchPageCount {

    private List<SplitMatch> list;

    private int pagecount;

    public SplitMatchPageCount() {

    }

	public SplitMatchPageCount(List<SplitMatch> list, int pagecount) {
		this.list = list;
		this.pagecount = pagecount;
	}

	public List<SplitMatch> getList() {
		return list;
	}

	public void setList(List<SplitMatch> list) {
		this.list = list;
	}

	public int getPagecount() {
		return pagecount;
	}

	public void setPagecount(int pagecount) {
		this.pagecount = pagecount;
	}
    
    
}
