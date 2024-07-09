
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
    public class SavedGetAllByUserIdQueryHandler : IRequestHandler<SavedGetAllByUserIdQuery, SavedResults>
    {
        private IReadOnlySavedProvidersRepository _savedProvidersRepository;
        private IReadOnlyProvidersRepository _providersRepository;
        private IReadOnlyOffersRepository _offersRepository;


        public SavedGetAllByUserIdQueryHandler(
            IReadOnlySavedProvidersRepository savedProvidersRepository, IReadOnlyProvidersRepository providersRepository, IReadOnlyOffersRepository offersRepository)
        {
            _savedProvidersRepository = savedProvidersRepository;
            _providersRepository = providersRepository;

            _offersRepository = offersRepository;

        }

        public async Task<SavedResults> Handle(SavedGetAllByUserIdQuery request, CancellationToken cancellationToken)
        {






            // //get all saved providers by user id and provider id not null

            var page =  _savedProvidersRepository.QueryHelper().Filter(saved => saved.UserIdAwqaf == request.UserId).GetPageAsync(request.Page);

            // //loop through all saved providers and get the provider id

            var savedProvider = new List<Providers>();
            var savedOffer = new List<Offers>();
var data = await page;
            foreach (var item in data.Content)
            {
                //check if provider id is not null
                if (item.ProviderId != null && item.ProviderId != "" && item.IsOffer == false)
                {

                    var entity = _providersRepository.QueryHelper()
                      .GetOneAsync(providers => providers.Id == long.Parse(item.ProviderId));
                    var providerTask = await entity;
                    savedProvider.Add(providerTask);
                    await Task.WhenAll(entity,page);


                }

                if (item.OfferId != null && item.OfferId != "" && item.IsOffer == true)
                {

                    var entity = _offersRepository.QueryHelper()
                      .GetOneAsync(offers => offers.Id == long.Parse(item.OfferId));
                    var offersTask = await entity;
                    savedOffer.Add(offersTask);

                    await Task.WhenAll(entity,page);

                }



            }



            SavedResults savedResults = new SavedResults(savedProvider, savedOffer);// here we create the savedResults object that store the saved providers and offers
            //return savedResults;
            return savedResults;

        }
    }
}
