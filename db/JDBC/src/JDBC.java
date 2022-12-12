
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class JDBC {

	private Connection con;

	public JDBC() {
		try {
			String url = "jdbc:mysql://tmp@34.168.52.103:22:xe/api?characterEncoding=UTF-8&serverTimezone=UTC";
			String user = "tmp";
			String passwd = "test";
			con = DriverManager.getConnection(url,
					user, passwd);
			
			con.close();
			System.out.println("DB연결 성공");
		} catch (SQLException e) {
			System.out.println("DB연결 실패");
			System.out.print("사유 : " + e.getMessage());
		}
	}

	public static void main(String[] args) {
		new JDBC();
	}

}