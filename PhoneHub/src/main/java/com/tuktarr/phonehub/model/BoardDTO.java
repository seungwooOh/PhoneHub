package com.tuktarr.phonehub.model;

public class BoardDTO {
	private int boardPk;
	private int page;
	private int sIdx;
	private int rowCnt;
	
	public int getBoardPk() {
		return boardPk;
	}
	public void setBoardPk(int boardPk) {
		this.boardPk = boardPk;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getsIdx() {
		return sIdx;
	}
	public void setsIdx(int sIdx) {
		this.sIdx = sIdx;
	}
	public int getRowCnt() {
		return rowCnt;
	}
	public void setRowCnt(int rowCnt) {
		this.rowCnt = rowCnt;
	}
	
	
}
