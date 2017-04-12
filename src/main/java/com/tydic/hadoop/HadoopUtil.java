package com.tydic.hadoop;

import org.apache.hadoop.fs.*;

import java.io.IOException;
import java.net.URI;

import org.apache.hadoop.conf.Configuration;
public class HadoopUtil {

	private static final String HDFS_URL = "hdfs://dev03.oicp.net:9000/";
	private static final String HDFS_USER = "hadoop";
	
	public static FileSystem connect() {
		
		Configuration conf =  new Configuration();
		conf.set("fs.hdfs.impl", "org.apache.hadoop.hdfs.DistributedFileSystem");
		
		try {
			FileSystem fileSystem = FileSystem.get(URI.create(HDFS_URL),conf,HDFS_USER);
			return fileSystem;
		} catch (IOException e) {
			// TODO: handle exception
			e.printStackTrace();
		}catch (InterruptedException e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return null;
	}
	
	public static void close(FileSystem fileSystem) {
		try {
			fileSystem.close();
		} catch (IOException e) {
			// TODO: handle exception
			e.printStackTrace();
		}
	}
}
