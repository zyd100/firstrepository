/**
 * <p>
 * Title: UserService.java
 * </p>
 * <p>
 * Description:
 * </p>
 * 
 * @author zyd
 *         <p>
 *         创建日期：2020年3月15日
 *         </p>
 * @version 1.0
 */
package com.zl.webshop.service;

import com.zl.webshop.dto.UserExecution;
import com.zl.webshop.entity.User;

/**
 * <p>
 * Title: UserService
 * </p>
 * <p>
 * Description: 用户业务接口
 * </p>
 * 
 * @author zyd
 *         <p>
 *         创建日期：2020年3月15日
 *         </p>
 */
public interface UserService {

  /**
   * 
   * <p>
   * Title: register
   * </p>
   * <p>
   * Description: 注册
   * </p>
   * 
   * @param applicant 注册用户信息
   * @return 用户信息以及用户权限
   */
  UserExecution register(User applicant);

  /**
   * 
   * <p>
   * Title: login
   * </p>
   * <p>
   * Description: 登录
   * </p>
   * 
   * @param user 用户信息
   * @return 登录成功或失败
   */
  boolean login(User user);

  /**
   * 
   * <p>
   * Title: deleteAccount
   * </p>
   * <p>
   * Description: 删除用户
   * </p>
   * 
   * @param user 用户
   * @return 如果影响行数等于大于1 表示更新的记录行数
   */
  int deleteAccount(User user);

  /**
   * 
   * <p>
   * Title: updateUserInfo
   * </p>
   * <p>
   * Description: 更新个人信息
   * </p>
   * @param user 用户信息 
   * @return 如果影响行数等于大于1 表示更新的记录行数
   */
  int updateUserInfo(User user);
}
