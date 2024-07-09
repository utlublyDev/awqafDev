
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using System;
using System.Collections.Generic;
namespace awqaf.Application.Queries
{
    public class SavedProvidersGetAllByUserIdProviderQueryHandler : IRequestHandler<SavedProvidersGetAllByUserIdProviderQuery, List<Providers>>
    {
        private IReadOnlySavedProvidersRepository _savedProvidersRepository;
        private IReadOnlyProvidersRepository _providersRepository;


        public SavedProvidersGetAllByUserIdProviderQueryHandler(
            IReadOnlySavedProvidersRepository savedProvidersRepository, IReadOnlyProvidersRepository providersRepository)
        {
            _savedProvidersRepository = savedProvidersRepository;
            _providersRepository = providersRepository;


        }

        public async Task<List<Providers>> Handle(SavedProvidersGetAllByUserIdProviderQuery request, CancellationToken cancellationToken)
        {

            //get all saved providers by user id and provider id not null

            var page = await _savedProvidersRepository.QueryHelper().Filter(saved => saved.UserIdAwqaf == request.UserId ).GetPageAsync(request.Page);

            //loop through all saved providers and get the provider id

            var savedProvider = new List<Providers>();

            foreach (var item in page.Content)
            {
                //check if provider id is not null
                if(item.ProviderId != null&& item.ProviderId != "" && item.IsOffer==false)
                {
                 
                var entity = await _providersRepository.QueryHelper()
                  .GetOneAsync(providers => providers.Id == long.Parse(item.ProviderId));

                savedProvider.Add(entity);

                }
            }



            return savedProvider;
        }
    }
}
