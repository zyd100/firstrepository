/**
 * <p>
 * Title: UserDao.java
 * </p>
 * <p>
 * Description:
 * </p>
 * 
 * @author zyd @date 2020年3月12日 @version 1.0
 */
package com.zl.webshop.dao;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import com.zl.webshop.entity.User;

/**
 * <p>
 * Title: UserDao
 * </p>
 * <p>
 * Description: 用户表Dao接口
 * </p>
 * 
 * @author zyd 
 * <p>创建日期：2020年3月12日</p>
 */
public interface UserDao {
  /**
   * 
   * <p>
   * Title: count
   * </p>
   * <p>
   * Description: 获取用户总数
   * </p>
   * @return 用户总数
   */
  int count();
  /**
   * 
   * <p>
   * Title: queryById
   * </p>
   * <p>
   * Description: 通过用户名查询单个用户信息
   * </p>
   * 
   * @param userName 用户名
   * @return 用户信息
   */
  User queryById(@Param("userName") String userName);

  /**
   * 
   * <p>
   * Title: queryAll
   * </p>
   * <p>
   * Description: 查询所有用户
   * </p>
   * 
   * @param offset 查询起始位置
   * @param limit 查询条数
   * @return 用户列表
   */
  List<User> queryAll(@Param("offset") int offset, @Param("limit") int limit);



  /**
   * 
   * <p>
   * Title: addUser
   * </p>
   * <p>
   * Description: 增加用户
   * </p>
   * 
   * @param user 用户实体对象
   * @return 如果影响行数等于大于1 表示更新的记录行数
   */
  int addUser(@Param("user") User user);

  /**
   * 
   * <p>
   * Title: deleteUser
   * </p>
   * <p>
   * Description: 删除单个用户
   * </p>
   * 
   * @param user 用户实体对象
   * @return 如果影响行数等于大于1 表示更新的记录行数
   */
  int deleteUser(@Param("user") User user);

  /**
   * 
   * <p>
   * Title: updateUser
   * </p>
   * <p>
   * Description: 更新已有用户信息
   * </p>
   * 
   * @param user 用户实体对象
   * @return 如果影响行数等于大于1 表示更新的记录行数
   */
  int updateUser(@Param("user") User user);
}
