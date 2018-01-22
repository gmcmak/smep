<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


    Route::post('login', 'API\PassportController@login');
    
    Route::get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
    Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
    Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
    Route::post('password/reset', 'Auth\ResetPasswordController@reset');


    Route::group(['middleware' => 'auth:api'], function(){
        
        // user details    
        Route::post('register', 'API\PassportController@register');    
        Route::get('get-details', 'API\PassportController@getDetails');
        Route::get('get-all-users', 'API\PassportController@getAllUsers');
        Route::get('edit-details/{id}', 'API\PassportController@editDetails');
        Route::post('update-details/{id}', 'API\PassportController@updateDetails');
        Route::get('delete-details/{id}', 'API\PassportController@deleteDetails');
        Route::get('status-details/{id}/{status}', 'API\PassportController@statusDetails'); //enable and disable
        Route::get('get-countries', 'API\ExploreController@getCountryList');

        // consumers
        Route::get('get-consumer', 'API\ConsumerController@index');
        Route::post('insert-consumer', 'API\ConsumerController@insertConsumer');
        Route::get('view-consumer', 'API\ConsumerController@viewConsumer');
        Route::get('edit-consumer/{id}','API\ConsumerController@editConsumer');
        Route::post('update-consumer/{id}','API\ConsumerController@updateConsumer');
        Route::get('delete-consumer/{id}','API\ConsumerController@deleteConsumer');
        Route::get('status-consumer/{id}/{status}','API\ConsumerController@statusConsumer');
        Route::post('consumer-module','API\ConsumerController@consumerModule');

        // explore menu
        Route::post('add-explore', 'API\ExploreController@add');
        Route::get('get-explore', 'API\ExploreController@index');
        Route::post('update-explore/{id}/edit', 'API\ExploreController@updateRecord');
        Route::get('get-explore/{id}', 'API\ExploreController@edit');
        Route::get('delete-explore/{id}', 'API\ExploreController@delete');
        Route::get('status-explore/{id}/{status}','API\ExploreController@statusExplore');

        /**
        * for modules
        */
        Route::post('add-module','API\ModuleController@addModule');
        Route::get('view-module','API\ModuleController@viewModule');
        Route::get('get-module/{id}','API\ModuleController@getModule');
        Route::post('update-module/{id}','API\ModuleController@updateModule');
        Route::get('delete-module/{id}','API\ModuleController@deleteModule');

        /**
        * for roles
        */
        Route::post('insert-role','API\RoleController@insertRole');
        Route::get('view-role','API\RoleController@viewRoles');
        Route::get('edit-role/{id}','API\RoleController@editRole');
        Route::post('update-role/{id}','API\RoleController@updateRole');
        Route::get('delete-role/{id}','API\RoleController@deleteRole');
        Route::get('status-role/{id}/{status}','API\RoleController@statusRole');

        /**
        * for authors
        */
        Route::post('insert-author','API\AuthorController@insertAuthor');
        Route::get('view-author','API\AuthorController@viewAuthor');
        Route::get('edit-author/{id}','API\AuthorController@editAuthor');
        Route::post('update-author/{id}','API\AuthorController@updateAuthor');
        Route::get('delete-author/{id}','API\AuthorController@deleteAuthor');

        /**
        * for category
        */
        Route::post('insert-category','API\CategoryController@insertCategory');
        Route::get('view-category','API\CategoryController@viewCategory');
        Route::get('edit-category/{id}','API\CategoryController@editCategory');
        Route::post('update-category/{id}','API\CategoryController@updateCategory');
        Route::get('delete-category/{id}','API\CategoryController@deleteCategory');
        Route::get('status-category/{id}/{status}','API\CategoryController@statusCategory');

        /**
        * for keywords
        */
        Route::post('insert-keyword','API\KeywordController@insertKeyword');
        Route::get('view-keyword','API\KeywordController@viewKeyword');
        Route::get('edit-keyword/{id}','API\KeywordController@editKeyword');
        Route::post('update-keyword/{id}','API\KeywordController@updateKeyword');
        Route::get('delete-keyword/{id}','API\KeywordController@deleteKeyword');

        /**
        * for subject areas
        */
        Route::post('insert-subject-area','API\SubjectAreaController@insertSubjectArea');
        Route::get('view-subject-area','API\SubjectAreaController@viewSubjectArea');
        Route::get('edit-subject-area/{id}','API\SubjectAreaController@editSubjectArea');
        Route::post('update-subject-area/{id}','API\SubjectAreaController@updateSubjectArea');
        Route::get('delete-subject-area/{id}','API\SubjectAreaController@deleteSubjectArea');

        /**
        * for institutes
        */
        Route::get('get-institute','API\InstituteController@index');
        Route::post('insert-institute','API\InstituteController@insertInstitute');
        Route::get('view-institute','API\InstituteController@viewInstitute');
        Route::get('edit-institute/{id}','API\InstituteController@editInstitute');
        Route::post('update-institute/{id}','API\InstituteController@updateInstitute');
        Route::get('delete-institute/{id}','API\InstituteController@deleteInstitute');
        Route::get('status-institute/{id}/{status}','API\InstituteController@statusInstitute');

        Route::get('insert-institute-authorizer/{nic}/{institute_id}','API\InstituteController@insertInstituteAuthorizer');
        Route::get('get-institute-authorizer/{id}','API\InstituteController@viewInstituteAuthorizer');
        Route::get('insert-institute-provider/{nic}/{institute_id}','API\InstituteController@insertInstituteProvider');
        Route::get('get-institute-provider/{id}','API\InstituteController@viewInstituteProvider');

        Route::get('remove-institute-authorizer/{user_id}/{institute_id}','API\InstituteController@removeInstituteAuthorizer');
        Route::get('remove-institute-provider/{user_id}/{institute_id}','API\InstituteController@removeInstituteProvider');


        /**
        * for authorizers
        */
        Route::get('get-authorizer/{id}', 'API\AuthorizerController@index');
        Route::post('insert-authorizer', 'API\AuthorizerController@insertAuthorizer');
        Route::get('view-authorizers', 'API\AuthorizerController@viewAuthorizers');
        Route::get('edit-authorizer/{id}', 'API\AuthorizerController@editAuthorizer');
        Route::post('update-authorizer/{id}', 'API\AuthorizerController@updateAuthorizer');
        Route::get('delete-authorizer/{id}', 'API\AuthorizerController@deleteAuthorizer');
        Route::get('authorizer-status/{id}/{status}', 'API\AuthorizerController@authorizerStatus');

        /**
        * for providers
        */
        Route::get('get-provider/{id}', 'API\ProviderController@index');
        Route::post('insert-provider', 'API\ProviderController@insertProvider');
        Route::get('view-providers', 'API\ProviderController@viewProviders');
        Route::get('edit-provider/{id}', 'API\ProviderController@editProvider');
        Route::post('update-provider/{id}', 'API\ProviderController@updateProvider');
        Route::get('delete-provider/{id}', 'API\ProviderController@deleteProvider');
        Route::get('provider-status/{id}/{status}', 'API\ProviderController@providerStatus');

        /**
        * for contents
        */
        Route::get('get-content/{id}', 'API\ContentController@getContent');
        Route::post('add-content/{id}/{submission_id}', 'API\ContentController@addContent');
        Route::get('update-content/{id}', 'API\ContentController@updateContent');
        Route::get('get-content-info/{user_id}/{type_id}', 'API\ContentController@getContentInfo'); //get content details for show submission history
        Route::get('get-content-count/{user_id}/{type_id}', 'API\ContentController@getContentCount');

        /**
        * for submission
        */
        Route::post('add-submission', 'API\SubmissionController@addSubmission');
        Route::get('view-submission/{user_id}', 'API\SubmissionController@viewSubmission');
        Route::get('edit-submission/{id}/{user_id}', 'API\SubmissionController@editSubmission');
        Route::post('update-submission/{id}/{user_id}', 'API\SubmissionController@updateSubmission');

        /**
        * for country
        */
        Route::get('get-country','API\CountryController@getCountryList');

        /**
        * for type
        */
        Route::get('get-type', 'API\TypeController@getType');

    });
