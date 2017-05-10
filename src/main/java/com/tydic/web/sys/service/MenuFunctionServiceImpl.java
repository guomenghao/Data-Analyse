package com.tydic.web.sys.service;

import org.springframework.stereotype.Service;

import com.tydic.base.exception.BusinessException;
import com.tydic.base.service.ServiceBase;
import com.tydic.base.util.IMapEntry;
import com.tydic.base.util.Maps;
import com.tydic.base.util.ObjectUtil;
import com.tydic.base.util.ResultUtil;

/**
 * 
 * @author wujian
 *
 */
@Service("menuFunctionService")
public class MenuFunctionServiceImpl extends ServiceBase implements MenuFunctionService {

	public IMapEntry<String, Object> selectMenuFunctionList(IMapEntry<String, Object> paramMap) {
		return ResultUtil.resultSuccess(this.selectList("sys.menufunc.selectMenuFunctionList", paramMap));
	}

	public IMapEntry<String, Object> insertMenuFunction(IMapEntry<String, Object> paramMap) {
		String up_menu_func_path = "";
		if (ObjectUtil.isNotEmpty(paramMap.getString("up_menu_func_id"))) {
			@SuppressWarnings("unchecked")
			IMapEntry<String, Object> param = Maps.newMapEntry();
			param.put("menu_func_id", paramMap.getString("up_menu_func_id"));
			IMapEntry<String, Object> data = this.selectOne("sys.menufunc.selectMenuFunctionList", param);
			if (ObjectUtil.isEmpty(data)) {
				throw new BusinessException("指定的上级菜单标识不存在，请核实!");
			}
			up_menu_func_path = data.getString("menu_func_path");
		}
		// INSERT SYS_LIMIT,insertSysLimit
		paramMap.put("limit_auto_id", null);
		this.insert("sys.menufunc.insertSysLimit", paramMap);

		// INSERT insertMenuFunction
		paramMap.put("limit_id", paramMap.get("limit_auto_id"));
		paramMap.put("menu_func_auto_id", null);
		this.insert("sys.menufunc.insertMenuFunction", paramMap);

		// updateMenuFuncPathByMenuFuncId
		@SuppressWarnings("unchecked")
		IMapEntry<String, Object> param = Maps.newMapEntry();
		param.put("menu_func_id", paramMap.get("menu_func_auto_id"));

		if (ObjectUtil.isNotEmpty(paramMap.get("up_menu_func_id"))) {
			param.put("menu_func_path", up_menu_func_path + paramMap.getString("menu_func_auto_id") + "-");
		} else {

			param.put("menu_func_path", "-" + paramMap.getString("menu_func_auto_id") + "-");
		}
		this.update("sys.menufunc.updateMenuFuncPathByMenuFuncId", param);

		return ResultUtil.resultSuccess("新增菜单功能项信息成功!");
	}

	public IMapEntry<String, Object> delMenuFunction(IMapEntry<String, Object> paramMap) {
		// 将其子节点一起逻辑删除
		IMapEntry<String, Object> data = this.selectOne("sys.menufunc.selectMenuFunctionList", paramMap);

		if (ObjectUtil.isEmpty(data)) {
			throw new BusinessException("菜单节点不存在，请核实!");
		}

		String menu_func_path = data.getString("menu_func_path");

		@SuppressWarnings("unchecked")
		IMapEntry<String, Object> param = Maps.newMapEntry();
		param.put("menu_func_path", menu_func_path);

		this.update("sys.menufunc.delMenuFunction", param);

		return ResultUtil.resultSuccess("删除菜单功能项信息成功!");
	}

	public IMapEntry<String, Object> updateMenuFunction(IMapEntry<String, Object> paramMap) {
		IMapEntry<String, Object> data = this.selectOne("sys.menufunc.selectMenuFunctionList", paramMap);
		if (ObjectUtil.isEmpty(data)) {
			throw new BusinessException("指定的菜单节点不存在，请核实!");
		}
		this.update("sys.menufunc.updateMenuFunction", paramMap);
		// 如果上级菜单发生了变化，则还需要变更菜单path
		String req_up_menu_func_id = paramMap.getString("up_menu_func_id");
		String cur_up_menu_func_id = data.getString("up_menu_func_id");

		if ((ObjectUtil.isEmpty(req_up_menu_func_id) && ObjectUtil.isEmpty(cur_up_menu_func_id))
				|| (req_up_menu_func_id.equalsIgnoreCase(cur_up_menu_func_id))) {
			// 相同，无变化，不需要更新
		} else {
			// 不相同有变化，需要更新path
			String v_menu_func_path_current = data.getString("menu_func_path");
			String v_menu_func_path_new = "-" + data.getString("menu_func_id") + "-";
			if (ObjectUtil.isNotEmpty(req_up_menu_func_id)) {
				@SuppressWarnings("unchecked")
				IMapEntry<String, Object> param = Maps.newMapEntry();
				param.put("menu_func_id", req_up_menu_func_id);
				IMapEntry<String, Object> up_menu_func_data = this.selectOne("sys.menufunc.selectMenuFunctionList",
						param);
				v_menu_func_path_new = up_menu_func_data.getString("menu_func_path") + data.getString("menu_func_id")
						+ "-";
			}
			@SuppressWarnings("unchecked")
			IMapEntry<String, Object> param = Maps.newMapEntry();
			param.put("v_menu_func_path_current", v_menu_func_path_current);
			param.put("v_menu_func_path_new", v_menu_func_path_new);
			this.update("sys.menufunc.updateMenuFunctionPath", param);
		}

		return ResultUtil.resultSuccess("更新菜单功能项信息成功!");
	}
}
