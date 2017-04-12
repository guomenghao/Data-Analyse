package com.tydic.hadoop;

import java.io.FileNotFoundException;
import java.io.IOException;

import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;

public class App {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		FileSystem fileSystem = HadoopUtil.connect();
		try {
			FileStatus[] fileStatus = fileSystem.listStatus(new Path("/"));
			for (FileStatus item : fileStatus) {
				
				System.out.println(item.getOwner()+":"+item.getGroup()+":"+item.getPermission()+";");
				
			}
			HadoopUtil.close(fileSystem);
		} catch (FileNotFoundException e) {
			// TODO: handle exception
		}catch (IllegalArgumentException e) {
			// TODO: handle exception
		}catch (IOException e) {
			// TODO: handle exception
		}
	}

}
